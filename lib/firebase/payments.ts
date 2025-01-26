// import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export async function verifyPayment(sessionId: string): Promise<boolean> {
  try {
    // Here you would typically verify the payment with Stripe
    // and update the project funding
    return true;
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}
