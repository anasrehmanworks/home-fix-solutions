import { requiredFieldsPresent, submissionResponse, submitToTaskskill } from "@/lib/forms";

export async function POST(request: Request) {
  const formData = await request.formData();
  if (!requiredFieldsPresent(formData, ["name", "email", "rating", "service", "review"])) {
    return submissionResponse(false, "Please complete every review field.", 400);
  }

  await submitToTaskskill("Customer Review Form", formData);
  return submissionResponse(true, "Thanks. Your review has been submitted.");
}
