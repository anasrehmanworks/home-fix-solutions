import nodemailer from "nodemailer";
console.log("=== SMTP DEBUG ===");
console.log("HOST:", process.env.SMTP_HOST);
console.log("PORT:", process.env.SMTP_PORT);
console.log("USER:", process.env.SMTP_USER);
console.log("PASS EXISTS:", !!process.env.SMTP_PASS);
console.log("FROM:", process.env.EMAIL_FROM);
console.log("==================");
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.EMAIL_FROM!;

// --- GLOBAL SITE URL RESOLUTION ---
const WEBSITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://homefixsolution.org";

// --- GLOBAL EMAIL STYLES ---
const brandBlue = "#0284c7";
const textDark = "#1e293b";
const bgLight = "#f8fafc";
const borderLight = "#e2e8f0";

const containerStyle = `
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${bgLight};
`;

const cardStyle = `
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid ${borderLight};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const headerStyle = `
  background-color: ${brandBlue};
  padding: 24px;
  text-align: center;
`;

const headerTitleStyle = `
  color: #ffffff;
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const contentStyle = `
  padding: 24px;
  color: ${textDark};
  line-height: 1.6;
`;

const tableStyle = `
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
`;

const labelStyle = `
  padding: 10px 12px;
  background-color: #f1f5f9;
  border-bottom: 1px solid ${borderLight};
  font-weight: 600;
  width: 35%;
  font-size: 14px;
`;

const valueStyle = `
  padding: 10px 12px;
  border-bottom: 1px solid ${borderLight};
  font-size: 14px;
`;

const footerStyle = `
  text-align: center;
  padding: 24px 0 10px 0;
  font-size: 12px;
  color: #64748b;
  border-top: 1px solid ${borderLight};
  margin-top: 20px;
`;

// --- GLOBAL ADDITIONS ---
const logoHeader = `
  <div style="text-align:center;padding:20px 0 12px;">
    <picture>
      <source srcset="${WEBSITE_URL}/logo-horizontal.svg" type="image/svg+xml">
      <img
        src="${WEBSITE_URL}/logo-horizontal.png"
        alt="Home Fix Solution"
        style="max-width:240px;height:auto;display:block;margin:auto;"
      />
    </picture>
  </div>
`;

const customerContactCard = `
  <div style="background-color: #ffffff; border: 1px solid ${borderLight}; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); padding: 20px; margin-top: 24px; text-align: center;">
    <strong style="font-size: 16px; color: ${brandBlue}; display: block; margin-bottom: 8px;">Need Assistance?</strong>
    <p style="margin: 0 0 12px 0; font-size: 13px; color: #64748b;">If you have any questions regarding your appointment, our support team is always happy to help.</p>
    <p style="margin: 6px 0; font-size: 14px; color: ${textDark};">📞 <b>Phone:</b> <a href="tel:+17579084102" style="color: ${brandBlue}; text-decoration: none;">+1 757-908-4102</a></p>
    <p style="margin: 6px 0; font-size: 14px; color: ${textDark};">✉ <b>Email:</b> <a href="mailto:${FROM_EMAIL}" style="color: ${brandBlue}; text-decoration: none;">${FROM_EMAIL}</a></p>
    <p style="margin: 6px 0; font-size: 14px; color: ${textDark};">🌐 <b>Website:</b> <a href="https://homefixsolution.org" style="color: ${brandBlue}; text-decoration: none;">https://homefixsolution.org</a></p>
  </div>
  <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 16px; line-height: 1.4;">
    If you received this email by mistake, you may safely ignore it.
  </p>
`;

export async function sendBookingEmails(data: {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  zip: string;
  category: string;
  service: string;
  preferredDate: string;
  appointmentSlot: string;
  couponCode?: string;
}) {
  // Email to Owner
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: "sales@homefixsolution.org",
    subject: data.couponCode ? `Coupon Redemption - ${data.fullName}` : `New Booking - ${data.fullName}`,
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">
              ${data.couponCode ? "🎟 Coupon Redemption Request" : "New Booking Received"}
            </h1>
          </div>
          <div style="${contentStyle}">
            ${
              data.couponCode
                ? `
                  <div style="padding: 16px; background-color: #fffbeb; border: 2px dashed #f59e0b; border-radius: 6px; margin-bottom: 24px; text-align: center;">
                    <span style="display: block; font-size: 12px; text-transform: uppercase; color: #b45309; font-weight: 700; letter-spacing: 1px;">Promotional Code</span>
                    <strong style="font-size: 20px; color: #78350f;">${data.couponCode}</strong>
                  </div>
                `
                : ""
            }
            
            <h3 style="margin-top: 0; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Customer Details</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Name</td>
                <td style="${valueStyle}">${data.fullName}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Phone</td>
                <td style="${valueStyle}">${data.phone}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Email</td>
                <td style="${valueStyle}">${data.email}</td>
              </tr>
            </table>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Service Location</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Address</td>
                <td style="${valueStyle}">${data.address}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">State</td>
                <td style="${valueStyle}">${data.state}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">ZIP Code</td>
                <td style="${valueStyle}">${data.zip}</td>
              </tr>
            </table>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Appointment Details</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Category</td>
                <td style="${valueStyle}">${data.category}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Service</td>
                <td style="${valueStyle}">${data.service}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Preferred Date</td>
                <td style="${valueStyle}">${data.preferredDate}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Time Slot</td>
                <td style="${valueStyle}">${data.appointmentSlot}</td>
              </tr>
            </table>
          </div>
          <div style="${footerStyle}">
            <strong>Home Fix Solution Management Portal</strong>
          </div>
        </div>
      </div>
    `,
  });

  // Confirmation Email
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "Booking Confirmation - Home Fix Solution",
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">Booking Confirmation</h1>
          </div>
          <div style="${contentStyle}">
            <p style="font-size: 15px; margin-top: 0;">We've successfully received your booking.</p>

            ${
              data.couponCode
                ? `
                  <div style="padding: 16px; background-color: #ecfeff; border: 1px solid #0891b2; border-radius: 6px; margin: 24px 0;">
                    <strong style="color: #0891b2; font-size: 14px; display: block; margin-bottom: 4px;">Coupon Applied</strong>
                    <span style="font-size: 16px; font-weight: 600; color: #155e75;">${data.couponCode}</span>
                  </div>
                  <p style="font-size: 15px;">Your coupon has been successfully applied to your booking.</p>
                `
                : ""
            }

            <p style="font-size: 15px;">Our team will contact you shortly, and one of our technicians has been assigned to your service request.</p>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Booking Details</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Service</td>
                <td style="${valueStyle}">${data.service}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Address</td>
                <td style="${valueStyle}">${data.address}, ${data.state} ${data.zip}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Date</td>
                <td style="${valueStyle}">${data.preferredDate}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Time</td>
                <td style="${valueStyle}">${data.appointmentSlot}</td>
              </tr>
            </table>

            <p style="font-size: 15px; margin-top: 24px;">If you have any questions, please feel free to contact us anytime.</p>
            <p style="font-size: 15px; margin-bottom: 0;">Thank you for choosing Home Fix Solution.</p>
            
            ${customerContactCard}
          </div>
          <div style="${footerStyle}">
            &copy; 2004 Home Fix Solution.<br>All rights reserved.
          </div>
        </div>
      </div>
    `,
  });
}

export async function sendContactEmails(data: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  // Email to Owner
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: "sales@homefixsolution.org",
    subject: `New Request Call - ${data.name}`,
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">New Request Call</h1>
          </div>
          <div style="${contentStyle}">
            <h3 style="margin-top: 0; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Contact Information</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Name</td>
                <td style="${valueStyle}">${data.name}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Phone</td>
                <td style="${valueStyle}">${data.phone}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Email</td>
                <td style="${valueStyle}">${data.email}</td>
              </tr>
            </table>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Inquiry Message</h3>
            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; border-left: 4px solid ${brandBlue}; font-size: 14px; white-space: pre-wrap;">${data.message}</div>
          </div>
          <div style="${footerStyle}">
            <strong>Home Fix Solution Management Portal</strong>
          </div>
        </div>
      </div>
    `,
  });

  // Confirmation Email to Customer
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "We Received Your Request - Home Fix Solution",
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">Thank You</h1>
          </div>
          <div style="${contentStyle}">
            <p style="font-size: 16px; margin-top: 0;">Thank you, <strong>${data.name}</strong>!</p>
            <p style="font-size: 15px;">Our team will contact you shortly.</p>
            
            ${customerContactCard}
          </div>
          <div style="${footerStyle}">
            &copy; 2004 Home Fix Solution.<br>All rights reserved.
          </div>
        </div>
      </div>
    `,
  });
}

export async function sendCareerEmails(
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    state: string;
    city: string;
    zip: string;
    experience: string;
    expertise: string;
    licenseNumber: string;
  },
  licenseFile?: File
) {
  // Email to Owner
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: "sales@homefixsolution.org",
    subject: `New Technician Application - ${data.firstName} ${data.lastName}`,
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">New Technician Application</h1>
          </div>
          <div style="${contentStyle}">
            <h3 style="margin-top: 0; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Applicant Contact Details</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Full Name</td>
                <td style="${valueStyle}">${data.firstName} ${data.lastName}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Phone</td>
                <td style="${valueStyle}">${data.phone}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Email</td>
                <td style="${valueStyle}">${data.email}</td>
              </tr>
            </table>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Mailing Address</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Street Address</td>
                <td style="${valueStyle}">${data.address}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">City</td>
                <td style="${valueStyle}">${data.city}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">State</td>
                <td style="${valueStyle}">${data.state}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">ZIP Code</td>
                <td style="${valueStyle}">${data.zip}</td>
              </tr>
            </table>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Professional Qualifications</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Experience</td>
                <td style="${valueStyle}">${data.experience}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Expertise</td>
                <td style="${valueStyle}">${data.expertise}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">License Number</td>
                <td style="${valueStyle}">${data.licenseNumber || "N/A"}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Attachment</td>
                <td style="${valueStyle}">${licenseFile ? `📄 ${licenseFile.name}` : "No file attached"}</td>
              </tr>
            </table>
          </div>
          <div style="${footerStyle}">
            <strong>Home Fix Solution Careers Portal</strong>
          </div>
        </div>
      </div>
    `,
    attachments: licenseFile
      ? [
          {
            filename: licenseFile.name,
            content: Buffer.from(await licenseFile.arrayBuffer()),
            contentType: licenseFile.type,
          },
        ]
      : [],
  });

  // Email to Customer
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "Application Received - Home Fix Solution",
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">Thank You</h1>
          </div>
          <div style="${contentStyle}">
            <p style="font-size: 16px; margin-top: 0;">Dear <strong>${data.firstName}</strong>,</p>
            <p style="font-size: 15px;">We have successfully received your application details.</p>
            <p style="font-size: 15px;">Our hiring team will review it thoroughly and get in touch with you directly if your credentials line up with our current structural openings.</p>
            
            ${customerContactCard}
          </div>
          <div style="${footerStyle}">
            &copy; 2004 Home Fix Solution.<br>All rights reserved.
          </div>
        </div>
      </div>
    `,
  });
}

export async function sendReviewEmails(data: {
  name: string;
  email: string;
  rating: string;
  service: string;
  review: string;
}) {
  // Email to Owner
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: "sales@homefixsolution.org",
    subject: `New Customer Review - ${data.name}`,
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">New Customer Review</h1>
          </div>
          <div style="${contentStyle}">
            <h3 style="margin-top: 0; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Customer Details</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Name</td>
                <td style="${valueStyle}">${data.name}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Email</td>
                <td style="${valueStyle}">${data.email}</td>
              </tr>
            </table>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Rating & Performance</h3>
            <table style="${tableStyle}">
              <tr>
                <td style="${labelStyle}">Service Provided</td>
                <td style="${valueStyle}">${data.service}</td>
              </tr>
              <tr>
                <td style="${labelStyle}">Rating Score</td>
                <td style="${valueStyle}; color: #f59e0b; font-weight: bold; font-size: 16px;">⭐ ${data.rating}/5</td>
              </tr>
            </table>

            <h3 style="margin-top: 24px; color: ${brandBlue}; border-bottom: 2px solid ${brandBlue}; padding-bottom: 6px;">Customer Feedback</h3>
            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; border-left: 4px solid #f59e0b; font-size: 14px; italic; white-space: pre-wrap;">"${data.review}"</div>
          </div>
          <div style="${footerStyle}">
            <strong>Home Fix Solution Management Portal</strong>
          </div>
        </div>
      </div>
    `,
  });

  // Thank You Email to Customer
  await transporter.sendMail({
    from: `"Home Fix Solution" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "Thank You For Your Review - Home Fix Solution",
    html: `
      <div style="${containerStyle}">
        ${logoHeader}
        <div style="${cardStyle}">
          <div style="${headerStyle}">
            <h1 style="${headerTitleStyle}">Thank You</h1>
          </div>
          <div style="${contentStyle}">
            <p style="font-size: 16px; margin-top: 0;">Thank you, <strong>${data.name}</strong>!</p>
            <p style="font-size: 15px;">We truly appreciate you taking the time to provide your honest thoughts and review regarding your service experience.</p>
            
            ${customerContactCard}
          </div>
          <div style="${footerStyle}">
            &copy; 2004 Home Fix Solution.<br>All rights reserved.
          </div>
        </div>
      </div>
    `,
  });
}