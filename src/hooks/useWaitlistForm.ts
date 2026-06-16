"use client";

import { useState, useTransition } from "react";
import { registerWaitlist, upgradeWaitlist } from "@/app/actions";

type FormStep = "email" | "upgrade" | "success";

export function useWaitlistForm() {
  const [step, setStep] = useState<FormStep>("email");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  // STEP 1: Submit Email
  function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return;
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.set("email", email); // Ensure email is in payload

    startTransition(async () => {
      const result = await registerWaitlist(formData);
      if (result.success) {
        // If they were already on the list, skip the upgrade to prevent annoyance
        if (result.message.includes("already")) {
          setMessage(result.message);
          setStep("success");
        } else {
          setStep("upgrade");
        }
      } else {
        setErrorMsg(result.error);
      }
    });
  }

  // STEP 2: Submit Name & Phone
  function handleUpgradeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return;
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.set("email", email); // We need this to identify which row to update

    startTransition(async () => {
      const result = await upgradeWaitlist(formData);
      if (result.success) {
        setMessage("You're on the VIP list. We'll text you 24 hours before the drop.");
        setStep("success");
      } else {
        setErrorMsg(result.error);
      }
    });
  }

  // STEP 2.5: Skip Upgrade
  function handleSkip() {
    setMessage("You're on the list. Keep an eye on your inbox.");
    setStep("success");
  }

  return {
    step,
    email, setEmail,
    firstName, setFirstName,
    phone, setPhone,
    message, errorMsg,
    isPending,
    handleEmailSubmit,
    handleUpgradeSubmit,
    handleSkip,
  };
}