// Test script to verify email sending
const nodemailer = require("nodemailer");
const { readFileSync } = require("fs");
const path = require("path");

// Manually load .env.local
const envPath = path.join(__dirname, ".env.local");
try {
  const envFile = readFileSync(envPath, "utf8");
  envFile.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
} catch (error) {
  console.error("Could not load .env.local");
}

async function testEmail() {
  console.log("Testing email configuration...");
  console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL);
  console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "***configured***" : "NOT SET");

  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.error("❌ SMTP credentials not configured");
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log("\n📧 Sending test email...");

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Send to yourself
      subject: "Test Email from DS Overseas Contact Form",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify SMTP configuration.</p>
        <p>If you receive this, the email system is working correctly!</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("\n✅ SMTP configuration is working correctly!");
  } catch (error) {
    console.error("\n❌ Failed to send email:");
    console.error("Error:", error.message);
    if (error.code) {
      console.error("Error Code:", error.code);
    }
  }
}

testEmail();
