import {
  requiredFieldsPresent,
  submissionResponse,
  submitToTaskskill,
} from "@/lib/forms";

import { sendReviewEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (
      !requiredFieldsPresent(formData, [
        "name",
        "email",
        "rating",
        "service",
        "review",
      ])
    ) {
      return submissionResponse(
        false,
        "Please complete every review field.",
        400
      );
    }

    await Promise.all([
      submitToTaskskill("Customer Review Form", formData),

      sendReviewEmails({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        rating: String(formData.get("rating")),
        service: String(formData.get("service")),
        review: String(formData.get("review")),
      }),
    ]);

    return submissionResponse(
      true,
      "Thanks. Your review has been submitted."
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