import { requiredFieldsPresent, submissionResponse, submitToTaskskill } from "@/lib/forms";

export async function POST(request: Request) {
  const formData = await request.formData();
  if (!requiredFieldsPresent(formData, ["name", "phone", "email", "message"])) {
    return submissionResponse(false, "Please complete all contact fields.", 400);
  }

  await submitToTaskskill("Contact Form", formData);
  return submissionResponse(true, "Thanks. Your message has been received.");
}
