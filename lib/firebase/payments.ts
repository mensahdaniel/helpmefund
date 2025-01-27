// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "./config";
import { stripe } from "@/lib/stripe";

export async function verifyPayment(sessionId: string): Promise<boolean> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}
