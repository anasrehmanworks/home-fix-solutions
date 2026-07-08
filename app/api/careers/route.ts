import {
  requiredFieldsPresent,
  submissionResponse,
  submitToTaskskill,
} from "@/lib/forms";

import { sendCareerEmails } from "@/lib/email";

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
  "licenseUpload",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (!requiredFieldsPresent(formData, required)) {
      return submissionResponse(
        false,
        "Please complete every required application field and upload.",
        400
      );
    }

    await Promise.all([
      submitToTaskskill("Technician Application Form", formData),

      sendCareerEmails(
        {
          firstName: String(formData.get("firstName")),
          lastName: String(formData.get("lastName")),
          phone: String(formData.get("phone")),
          email: String(formData.get("email")),
          address: String(formData.get("address")),
          state: String(formData.get("state")),
          city: String(formData.get("city")),
          zip: String(formData.get("zip")),
          experience: String(formData.get("experience")),
          expertise: String(formData.get("expertise")),
          licenseNumber: String(formData.get("licenseNumber")),
        },
        formData.get("licenseUpload") as File
      ),
    ]);

    return submissionResponse(
      true,
      "Thanks. Your technician application has been received."
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