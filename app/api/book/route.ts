import {
  requiredFieldsPresent,
  submissionResponse,
  submitToTaskskill,
} from "@/lib/forms";
import { sendBookingEmails } from "@/lib/email";

const bookingRequired = [
  "fullName",
  "phone",
  "email",
  "address",
  "state",
  "zip",
  "preferredDate",
  "appointmentSlot",
  "category",
  "service",
];

const couponRequired = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "address",
  "state",
  "zip",
  "preferredDate",
  "appointmentSlot",
  "category",
  "service",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const isCoupon = formData.has("couponCode");

    if (
      !requiredFieldsPresent(
        formData,
        isCoupon ? couponRequired : bookingRequired
      )
    ) {
      return submissionResponse(
        false,
        "Please complete all required booking fields.",
        400
      );
    }

    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");

    const emailData = {
      fullName: isCoupon
        ? `${firstName} ${lastName}`.trim()
        : String(formData.get("fullName")),

      phone: String(formData.get("phone")),
      email: String(formData.get("email")),
      address: String(formData.get("address")),
      state: String(formData.get("state")),
      zip: String(formData.get("zip")),
      category: String(formData.get("category")),
      service: String(formData.get("service")),
      preferredDate: String(formData.get("preferredDate")),
      appointmentSlot: String(formData.get("appointmentSlot")),
      couponCode: isCoupon
        ? String(formData.get("couponCode"))
        : undefined,
    };

    await Promise.all([
      submitToTaskskill(
        isCoupon
          ? "Coupon Redemption Form"
          : "Customer Appointment Form",
        formData
      ),

      sendBookingEmails(emailData),
    ]);

    return submissionResponse(
      true,
      "Thanks. Your booking request has been received."
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