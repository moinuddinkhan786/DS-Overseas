# Email Logging System Documentation

## Overview

This project includes a comprehensive logging system that tracks all form submissions and email activities. Logs are stored both in the console and in daily JSON files.

## Features

✅ **Form Submission Tracking** - Logs every form submission with complete details
✅ **Email Success/Failure Tracking** - Records whether emails were sent successfully
✅ **Detailed Error Messages** - Captures error details when email sending fails
✅ **Daily Log Files** - Creates separate JSON files for each day
✅ **Console Output** - Real-time formatted logs in the console
✅ **API Access** - RESTful API to retrieve logs programmatically

## Log Storage

Logs are stored in: `logs/email-logs-YYYY-MM-DD.json`

Example: `logs/email-logs-2026-05-25.json`

**Note**: Log files are excluded from git to protect user privacy.

## Accessing Logs

### 1. Via API

#### Get Today's Logs
```bash
GET http://localhost:3000/api/logs
```

#### Get Specific Date Logs
```bash
GET http://localhost:3000/api/logs?date=2026-05-25
```

#### Response Format
```json
{
  "date": "2026-05-25",
  "totalEntries": 15,
  "logs": [
    {
      "timestamp": "2026-05-25T10:30:45.123Z",
      "type": "form_submission",
      "formData": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "destination": "Canada",
        "formType": "journey"
      },
      "status": "submitted"
    }
  ],
  "availableLogs": ["2026-05-25", "2026-05-24", "2026-05-23"]
}
```

### 2. Via Console

When the development server is running, logs appear in real-time:

```
============================================================
[2026-05-25T10:30:45.123Z] FORM_SUBMISSION
============================================================
📝 Form Submission Details:
   Name: John Doe
   Email: john@example.com
   Phone: +1234567890
   Destination: Canada
   Form Type: journey
   Status: submitted
============================================================

============================================================
[2026-05-25T10:30:46.456Z] EMAIL_SUCCESS
============================================================
✅ Email Sent Successfully:
   Type: admin
   To: moinuddinkhan7816@gmail.com
   Subject: New Journey Form Submission - DS Overseas
============================================================
```

### 3. Via File System

Access log files directly:
```bash
cd logs
cat email-logs-2026-05-25.json
```

## Log Entry Types

### 1. Form Submission (`form_submission`)
Logged when a user submits a form.

```json
{
  "timestamp": "2026-05-25T10:30:45.123Z",
  "type": "form_submission",
  "formData": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "destination": "Canada",
    "message": "Optional message",
    "formType": "journey"
  },
  "status": "submitted"
}
```

### 2. Email Success (`email_success`)
Logged when an email is sent successfully.

```json
{
  "timestamp": "2026-05-25T10:30:46.456Z",
  "type": "email_success",
  "emailDetails": {
    "to": "john@example.com",
    "subject": "Thank You for Contacting DS Overseas",
    "emailType": "user"
  },
  "status": "success"
}
```

### 3. Email Failure (`email_failure`)
Logged when email sending fails.

```json
{
  "timestamp": "2026-05-25T10:30:47.789Z",
  "type": "email_failure",
  "emailDetails": {
    "to": "admin@example.com",
    "subject": "New Form Submission",
    "emailType": "admin"
  },
  "error": "Connection timeout: Unable to reach SMTP server",
  "status": "failed"
}
```

## Common Scenarios

### Scenario 1: Form Submitted Successfully with Emails Sent
```
1. form_submission (status: submitted)
2. email_success (admin email)
3. email_success (user email)
4. form_submission (status: success)
```

### Scenario 2: Form Submitted but Email Failed
```
1. form_submission (status: submitted)
2. email_failure (with error details)
3. form_submission (status: failed)
```

### Scenario 3: SMTP Not Configured
```
1. form_submission (status: submitted)
2. form_submission (status: success)
   Note: Logs show "SMTP not configured - form logged but email not sent"
```

## Testing the Logging System

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Submit a test form** on your website (e.g., http://localhost:3000)

3. **Check console output** - You should see formatted logs immediately

4. **Verify log file created**:
   ```bash
   ls logs/
   cat logs/email-logs-$(date +%Y-%m-%d).json
   ```

5. **Access via API**:
   ```bash
   curl http://localhost:3000/api/logs
   ```

## Production Deployment

### Vercel & Serverless Environments

**Important**: In serverless environments like Vercel, the file system is **read-only**. The logger automatically detects this and switches to **console-only logging**.

#### How Logging Works in Production:

1. **Console Logs Only**: All logs are written to the console (stdout)
2. **Platform Captures Logs**: Vercel/AWS automatically captures console output
3. **No File Writing**: The logger skips file writing in serverless environments
4. **No Errors**: The application continues to work normally

#### Viewing Logs in Vercel:

1. **Vercel Dashboard**: Go to your project → **Logs** tab
2. **Real-time Logs**: View logs as they happen during function execution
3. **Filter by Function**: Filter logs by the `/api/contact` function
4. **Search**: Search for specific form submissions or errors

**Direct Link**: [Vercel Dashboard Logs](https://vercel.com/dashboard/logs)

#### Accessing Logs via API:

The `/api/logs` endpoint in production will return:
```json
{
  "message": "File-based logs are not available in serverless environments",
  "info": "Logs are captured in the platform's logging system",
  "tip": "View logs in your Vercel dashboard under the Runtime Logs section"
}
```

**Recommendation**: For production logging, consider:
- **Vercel Logs** (built-in, free for hobbyist plans)
- **Logtail** (formerly Timber.io) - Easy Vercel integration
- **Datadog** - Enterprise-grade logging and monitoring
- **New Relic** - Application performance monitoring
- **Sentry** - Error tracking and performance monitoring

### Environment Variables Required

Ensure these are set in production:
```env
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Privacy & Security

⚠️ **Important Security Notes**:

1. **Sensitive Data**: Logs contain user emails, phone numbers, and messages
2. **Access Control**: Restrict access to `/api/logs` endpoint in production
3. **GDPR Compliance**: Implement log retention policies
4. **Regular Cleanup**: Delete old logs after appropriate retention period
5. **No Git Commits**: Logs are excluded from git via `.gitignore`

### Recommended: Add Authentication to Logs API

For production, protect the logs endpoint:

```typescript
// Add to app/api/logs/route.ts
export async function GET(request: NextRequest) {
  // Check for API key or authentication
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.LOGS_API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  // ... rest of the code
}
```

## Troubleshooting

### No Logs Appearing

1. **Check if logs directory exists**:
   ```bash
   ls -la logs/
   ```

2. **Check file permissions** (Unix/Mac):
   ```bash
   chmod 755 logs/
   ```

3. **Verify imports** in `app/api/contact/route.ts`:
   ```typescript
   import { emailLogger } from "@/lib/logger";
   ```

### Console Logs Not Showing

- Ensure development server is running
- Check browser console for errors
- Verify no firewall blocking localhost

### API Returns 404

- Restart the development server
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run dev`

## Future Enhancements

Potential improvements:
- [ ] Add log search/filter functionality
- [ ] Export logs to CSV/Excel
- [ ] Email delivery statistics dashboard
- [ ] Integration with external logging services
- [ ] Automated log rotation and archival
- [ ] Real-time log streaming via WebSocket

## Support

For issues or questions, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Nodemailer Documentation](https://nodemailer.com/)
- Project GitHub Issues
