import userModel from "../models/userModel.js";
import { Webhook } from "svix";

// API controller function to manage Clerk user with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
  console.log("✅ Clerk webhook hit");

  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = whook.verify(
      req.body,
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
      }
    );

    const { data, type } = evt;

    console.log("🧾 Webhook Type:", type);

    switch (type) {
      case "user.created":
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.create(userData);
        console.log("✅ User saved:", userData);
        return res.status(200).json({ success: true });

      case "user.updated":
        await userModel.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo: data.image_url,
          }
        );
        return res.status(200).json({ success: true });

      case "user.deleted":
        await userModel.findOneAndDelete({ clerkId: data.id });
        return res.status(200).json({ success: true });

      default:
        console.log("ℹ️ Unhandled webhook type:", type);
        return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("❌ Error in webhook handler:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
export { clerkWebhooks };