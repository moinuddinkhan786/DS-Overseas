import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export interface EmailLog {
  timestamp: string;
  type: "form_submission" | "email_success" | "email_failure";
  formData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    destination: string;
    message?: string;
    formType?: string;
  };
  emailDetails?: {
    to: string;
    subject: string;
    emailType: "admin" | "user";
  };
  error?: string;
  status: "success" | "failed" | "submitted";
}

export class EmailLogger {
  private logDir: string;

  constructor() {
    // Store logs in the project root logs directory
    this.logDir = path.join(process.cwd(), "logs");
  }

  private async ensureLogDirectory() {
    if (!existsSync(this.logDir)) {
      await mkdir(this.logDir, { recursive: true });
    }
  }

  private getLogFileName() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `email-logs-${year}-${month}-${day}.json`;
  }

  private async readLogFile(filePath: string): Promise<EmailLog[]> {
    try {
      if (existsSync(filePath)) {
        const { readFile } = await import("fs/promises");
        const content = await readFile(filePath, "utf-8");
        return JSON.parse(content);
      }
      return [];
    } catch (error) {
      console.error("Error reading log file:", error);
      return [];
    }
  }

  async log(logEntry: Omit<EmailLog, "timestamp">) {
    const timestamp = new Date().toISOString();
    const logWithTimestamp: EmailLog = {
      ...logEntry,
      timestamp,
    };

    // Always log to console first
    this.logToConsole(logWithTimestamp);

    // Try to write to file, but don't fail if it's not possible (e.g., Vercel serverless)
    try {
      // Check if we're in a serverless environment (Vercel)
      const isServerless = process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME;

      if (isServerless) {
        // In serverless environments, file system is read-only
        // Console logs are captured by the platform (Vercel, AWS CloudWatch, etc.)
        return true;
      }

      await this.ensureLogDirectory();
      const logFilePath = path.join(this.logDir, this.getLogFileName());
      const existingLogs = await this.readLogFile(logFilePath);
      existingLogs.push(logWithTimestamp);
      await writeFile(logFilePath, JSON.stringify(existingLogs, null, 2), "utf-8");

      return true;
    } catch (error) {
      // Silently fail file writing in production environments
      // Console logs are still captured
      if (process.env.NODE_ENV === "development") {
        console.error("⚠️  Failed to write to log file (this is normal in serverless environments):", error);
      }
      return false;
    }
  }

  private logToConsole(log: EmailLog) {
    const separator = "=".repeat(60);
    console.log(`\n${separator}`);
    console.log(`[${log.timestamp}] ${log.type.toUpperCase()}`);
    console.log(separator);

    if (log.type === "form_submission" && log.formData) {
      console.log("📝 Form Submission Details:");
      console.log(`   Name: ${log.formData.firstName} ${log.formData.lastName}`);
      console.log(`   Email: ${log.formData.email}`);
      console.log(`   Phone: ${log.formData.phone}`);
      console.log(`   Destination: ${log.formData.destination}`);
      if (log.formData.message) {
        console.log(`   Message: ${log.formData.message}`);
      }
      console.log(`   Form Type: ${log.formData.formType || "N/A"}`);
      console.log(`   Status: ${log.status}`);
    }

    if (log.type === "email_success" && log.emailDetails) {
      console.log("✅ Email Sent Successfully:");
      console.log(`   Type: ${log.emailDetails.emailType}`);
      console.log(`   To: ${log.emailDetails.to}`);
      console.log(`   Subject: ${log.emailDetails.subject}`);
    }

    if (log.type === "email_failure") {
      console.log("❌ Email Send Failed:");
      if (log.emailDetails) {
        console.log(`   Type: ${log.emailDetails.emailType}`);
        console.log(`   To: ${log.emailDetails.to}`);
        console.log(`   Subject: ${log.emailDetails.subject}`);
      }
      if (log.error) {
        console.log(`   Error: ${log.error}`);
      }
    }

    console.log(separator + "\n");
  }

  async logFormSubmission(formData: EmailLog["formData"], status: EmailLog["status"]) {
    return this.log({
      type: "form_submission",
      formData,
      status,
    });
  }

  async logEmailSuccess(emailDetails: EmailLog["emailDetails"]) {
    return this.log({
      type: "email_success",
      emailDetails,
      status: "success",
    });
  }

  async logEmailFailure(emailDetails: EmailLog["emailDetails"], error: string) {
    return this.log({
      type: "email_failure",
      emailDetails,
      error,
      status: "failed",
    });
  }
}

// Export a singleton instance
export const emailLogger = new EmailLogger();
