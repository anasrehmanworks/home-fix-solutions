import { requiredFieldsPresent, submissionResponse, submitToTaskskill } from "@/lib/forms";

const required = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "address",
  "state",
  "city",
  "zip",
  "experience",
  "expertise",
  "licenseNumber",
  "licenseUpload"
];

export async function POST(request: Request) {
  const formData = await request.formData();
  if (!requiredFieldsPresent(formData, required)) {
    return submissionResponse(false, "Please complete every required application field and upload.", 400);
  }

  await submitToTaskskill("Technician Application Form", formData);
  return submissionResponse(true, "Thanks. Your technician application has been received.");
}
