import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely, resolving conflicts.
 * Use this whenever you're conditionally applying classes to a component.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}