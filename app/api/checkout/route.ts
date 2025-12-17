import { getPriceIdFromType } from "@/lib/plants";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Read request body
    const { plan } = await request.json();
    console.log(plan);

    // Get price ID
    const priceId = getPriceIdFromType(plan);
    if (!priceId) {
      console.error("❌ Invalid plan received:", plan);
      return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
    }

    const origin = "http://localhost:3000";

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/select`,
      cancel_url: `${origin}/subscribe`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("🔥 STRIPE CHECKOUT ERROR:", {
      message: error.message,
      stack: error.stack,
      raw: error.raw,
    });

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
