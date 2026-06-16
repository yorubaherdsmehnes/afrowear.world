import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware — runs on the Edge before every matched request.
 *
 * Responsibilities:
 *   1. Rate-limit form submissions to the waitlist action
 *      (prevents spam without a third-party service)
 *   2. Basic bot protection via user-agent header inspection
 *
 * Rate-limit strategy:
 *   We use a simple in-memory counter keyed by IP.
 *   Edge runtime resets between deployments and across regions,
 *   so this is a soft limit — good enough for a waitlist page.
 *   For production hardening, swap the Map for an Upstash Redis
 *   client: https://docs.upstash.com/redis/sdks/ratelimit
 */

// In-memory store: ip → { count, windowStart }
// NOTE: This resets on cold starts. For a persistent rate limit,
// replace with Upstash Redis (@upstash/ratelimit).
const ipRequestMap = new Map<string, { count: number; windowStart: number }>();

const RATE_LIMIT = 5;           // max form submits per window
const WINDOW_MS = 60 * 1000;   // 1-minute sliding window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestMap.get(ip);

  if (!record || now - record.windowStart > WINDOW_MS) {
    // First request in this window — reset
    ipRequestMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count += 1;
  return false;
}

/** Crude bot filter — blocks headless requests with no user-agent */
function looksLikeBot(ua: string | null): boolean {
  if (!ua) return true;
  const lower = ua.toLowerCase();
  // Allow legitimate crawlers (Googlebot etc.) on GET requests
  // but block common script-kiddie tools on POST
  const botPatterns = ["curl/", "python-requests", "axios/", "wget/", "scrapy"];
  return botPatterns.some((p) => lower.includes(p));
}

export function middleware(request: NextRequest) {
  const { method, nextUrl } = request;

  // Only guard the Next.js Server Action endpoint
  // Server Actions post to the current page URL with a specific header
  const isServerAction =
    method === "POST" &&
    request.headers.get("next-action") !== null;

  if (!isServerAction) {
    return NextResponse.next();
  }

  // ── Bot check ───────────────────────────────────────────────────────────────
  const userAgent = request.headers.get("user-agent");
  if (looksLikeBot(userAgent)) {
    return new NextResponse(
      JSON.stringify({ error: "Forbidden" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Rate limit ──────────────────────────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  if (isRateLimited(ip)) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please wait a minute." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes — the guard logic above narrows to POST + server actions
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};