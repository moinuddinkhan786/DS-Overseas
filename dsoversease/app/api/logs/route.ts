import { NextRequest, NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    // Check if we're in a serverless environment
    const isServerless = process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME;

    if (isServerless) {
      return NextResponse.json({
        message: "File-based logs are not available in serverless environments",
        info: "Logs are captured in the platform's logging system (Vercel Logs, CloudWatch, etc.)",
        tip: "View logs in your Vercel dashboard under the Runtime Logs section",
        vercelLogsUrl: "https://vercel.com/dashboard/logs",
      });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const logsDir = path.join(process.cwd(), "logs");

    // Check if logs directory exists
    if (!existsSync(logsDir)) {
      return NextResponse.json(
        { error: "Logs directory does not exist. This is expected in serverless environments." },
        { status: 404 }
      );
    }

    // If date is provided, return specific log file
    if (date) {
      const logFileName = `email-logs-${date}.json`;
      const logFilePath = path.join(logsDir, logFileName);

      if (!existsSync(logFilePath)) {
        return NextResponse.json(
          { error: `No logs found for date: ${date}`, availableLogs: await getAvailableLogFiles(logsDir) },
          { status: 404 }
        );
      }

      const content = await readFile(logFilePath, "utf-8");
      const logs = JSON.parse(content);

      return NextResponse.json({
        date,
        totalEntries: logs.length,
        logs,
      });
    }

    // If no date provided, return list of available log files
    const availableFiles = await getAvailableLogFiles(logsDir);

    if (availableFiles.length === 0) {
      return NextResponse.json({
        message: "No log files found",
        availableLogs: [],
      });
    }

    // Get today's logs by default
    const today = new Date().toISOString().split("T")[0];
    const todayLogFile = `email-logs-${today}.json`;
    const todayLogPath = path.join(logsDir, todayLogFile);

    if (existsSync(todayLogPath)) {
      const content = await readFile(todayLogPath, "utf-8");
      const logs = JSON.parse(content);

      return NextResponse.json({
        date: today,
        totalEntries: logs.length,
        logs,
        availableLogs: availableFiles,
      });
    }

    return NextResponse.json({
      message: "No logs for today",
      availableLogs: availableFiles,
    });
  } catch (error) {
    console.error("Error reading logs:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to read logs: ${errorMessage}` },
      { status: 500 }
    );
  }
}

async function getAvailableLogFiles(logsDir: string): Promise<string[]> {
  try {
    const files = await readdir(logsDir);
    return files
      .filter((file) => file.startsWith("email-logs-") && file.endsWith(".json"))
      .map((file) => file.replace("email-logs-", "").replace(".json", ""))
      .sort()
      .reverse(); // Most recent first
  } catch (error) {
    return [];
  }
}
