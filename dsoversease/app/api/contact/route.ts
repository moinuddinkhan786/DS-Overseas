import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailLogger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, destination, message, formType } = body;

    // Log form submission
    await emailLogger.logFormSubmission(
      { firstName, lastName, email, phone, destination, message, formType },
      "submitted"
    );

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !destination) {
      await emailLogger.logFormSubmission(
        { firstName, lastName, email, phone, destination, message, formType },
        "failed"
      );
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || process.env.SMTP_PASSWORD === "your_app_password_here") {
      await emailLogger.logFormSubmission(
        { firstName, lastName, email, phone, destination, message, formType },
        "success"
      );
      console.log("⚠️  SMTP not configured - form logged but email not sent");

      return NextResponse.json(
        { message: "Form submitted successfully! We will contact you soon." },
        { status: 200 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log("Attempting to send email via Gmail SMTP...");

    // Email to admin (you)
    const adminMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: "moinuddinkhan7816@gmail.com, moinuddinkhan7114@gmail.com",
      subject: `New ${formType || "Contact"} Form Submission - DS Overseas`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1257d6, #0a3ca8); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Form Submission</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">DS Overseas Education Consultants</p>
          </div>

          <div style="background: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #1257d6; padding-bottom: 10px;">
              ${formType === "contact" ? "Contact Form" : "Journey Form"} Details
            </h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">
                  <a href="mailto:${email}" style="color: #1257d6; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Phone:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">
                  <a href="tel:${phone}" style="color: #1257d6; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; ${message ? "border-bottom: 1px solid #e2e8f0;" : ""} color: #64748b;">Destination:</td>
                <td style="padding: 12px 0; ${message ? "border-bottom: 1px solid #e2e8f0;" : ""} color: #1e293b; font-weight: 600;">${destination}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 12px 0; color: #64748b; vertical-align: top;">Message:</td>
                <td style="padding: 12px 0; color: #1e293b;">${message}</td>
              </tr>
              ` : ""}
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #f1f5f9; border-radius: 8px;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                <strong>Reply to this lead:</strong>
                <a href="mailto:${email}" style="color: #1257d6; text-decoration: none;">Click here to reply</a>
              </p>
            </div>
          </div>

          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} DS Overseas Education Consultants
          </p>
        </div>
      `,
    };

    // Auto-reply email to user
    const userMailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Thank You for Contacting DS Overseas Education Consultants",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1257d6, #0a3ca8); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Thank You, ${firstName}!</h1>
          </div>

          <div style="background: #ffffff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
              Thank you for reaching out to <strong>DS Overseas Education Consultants</strong>. We have received your inquiry and our team will get back to you within 24 hours.
            </p>

            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin: 0 0 12px; font-size: 16px;">Your Submission Details:</h3>
              <p style="margin: 8px 0; color: #64748b;"><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p style="margin: 8px 0; color: #64748b;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0; color: #64748b;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 8px 0; color: #64748b;"><strong>Preferred Destination:</strong> ${destination}</p>
              ${message ? `<p style="margin: 8px 0; color: #64748b;"><strong>Message:</strong> ${message}</p>` : ""}
            </div>

            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 16px 0;">
              In the meantime, feel free to explore our services or contact us directly:
            </p>

            <div style="background: linear-gradient(135deg, #1257d6, #0a3ca8); padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="color: #ffffff; margin: 0 0 8px; font-size: 14px;">📞 Call us at</p>
              <a href="tel:+917046755605" style="color: #ffffff; font-size: 20px; font-weight: bold; text-decoration: none;">+91 7046755605</a>
            </div>

            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 16px 0 0;">
              Best Regards,<br>
              <strong style="color: #1e293b;">DS Overseas Education Consultants</strong><br>
              106/107, Atlantis, Above Jasmin Mobile, Nr. Genda Circle, Vadodara - 390023
            </p>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://dsoverseas.com" style="display: inline-block; padding: 12px 24px; background: #1257d6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Visit Our Website</a>
          </div>

          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} DS Overseas Education Consultants. All Rights Reserved.
          </p>
        </div>
      `,
    };

    // Send both emails
    try {
      // Send admin email
      await transporter.sendMail(adminMailOptions);
      await emailLogger.logEmailSuccess({
        to: adminMailOptions.to,
        subject: adminMailOptions.subject,
        emailType: "admin",
      });

      // Send user auto-reply
      await transporter.sendMail(userMailOptions);
      await emailLogger.logEmailSuccess({
        to: userMailOptions.to,
        subject: userMailOptions.subject,
        emailType: "user",
      });

      // Log overall success
      await emailLogger.logFormSubmission(
        { firstName, lastName, email, phone, destination, message, formType },
        "success"
      );

      return NextResponse.json(
        { message: "Form submitted successfully! We will contact you soon." },
        { status: 200 }
      );
    } catch (emailError) {
      // Log email sending failure
      const errorMessage = emailError instanceof Error ? emailError.message : "Unknown error";

      await emailLogger.logEmailFailure(
        {
          to: `${adminMailOptions.to}, ${userMailOptions.to}`,
          subject: "Email Send Attempt",
          emailType: "admin",
        },
        errorMessage
      );

      await emailLogger.logFormSubmission(
        { firstName, lastName, email, phone, destination, message, formType },
        "failed"
      );

      throw emailError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error("❌ Error in contact form handler:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    );
  }
}
