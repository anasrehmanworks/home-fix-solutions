import {
  requiredFieldsPresent,
  submissionResponse,
  submitToTaskskill,
} from "@/lib/forms";

import { sendContactEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (
      !requiredFieldsPresent(formData, [
        "name",
        "phone",
        "email",
        "message",
      ])
    ) {
      return submissionResponse(
        false,
        "Please complete all contact fields.",
        400
      );
    }

    await Promise.all([
      submitToTaskskill("Contact Form", formData),

      sendContactEmails({
        name: String(formData.get("name")),
        phone: String(formData.get("phone")),
        email: String(formData.get("email")),
        message: String(formData.get("message")),
      }),
    ]);

    return submissionResponse(
      true,
      "Thanks. Your message has been received."
    );
  } catch (error) {
    console.error(error);

    return submissionResponse(
      false,
      "Something went wrong. Please try again.",
      500
    );
  }
}