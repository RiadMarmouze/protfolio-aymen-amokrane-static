"use client";

import { firestore } from "@/lib/firebase/client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function subscribe(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!email) {
    alert("Please enter a valid email.");
    return;
  }

  try {
    // Add the subscriber
    await addDoc(collection(firestore, "subscribers"), {
      email,
      createdAt: serverTimestamp(),
    });

    alert("Thanks for subscribing!");
  } catch (err) {
    console.error("[subscribe] error:", err);
    alert("Something went wrong. Please try again.");
  }
}
