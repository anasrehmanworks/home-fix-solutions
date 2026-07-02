import { requiredFieldsPresent, submissionResponse, submitToTaskskill } from "@/lib/forms";

const required = [
  "fullName",
  "phone",
  "email",
  "address",
  "state",
  "zip",
  "preferredDate",
  "appointmentSlot",
  "category",
  "service"
];

export async function POST(request: Request) {
  const formData = await request.formData();
  if (!requiredFieldsPresent(formData, required)) {
    return submissionResponse(false, "Please complete all required booking fields.", 400);
  }

  await submitToTaskskill(formData.has("couponCode") ? "Coupon Redemption Form" : "Customer Appointment Form", formData);
  return submissionResponse(true, "Thanks. Your booking request has been received.");
}
