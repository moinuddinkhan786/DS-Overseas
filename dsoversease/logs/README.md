# Email Logs Directory

This directory contains daily log files for all email and form submission activities.

## Log Files

Log files are automatically created with the naming pattern:
```
email-logs-YYYY-MM-DD.json
```

For example: `email-logs-2026-05-25.json`

## Log Structure

Each log file contains an array of log entries with the following structure:

```json
{
  "timestamp": "2026-05-25T10:30:45.123Z",
  "type": "form_submission | email_success | email_failure",
  "formData": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "destination": "Canada",
    "message": "Optional message",
    "formType": "journey | contact"
  },
  "emailDetails": {
    "to": "recipient@example.com",
    "subject": "Email subject",
    "emailType": "admin | user"
  },
  "error": "Error message if failed",
  "status": "success | failed | submitted"
}
```

## Log Types

### 1. **form_submission**
Logs when a form is submitted, regardless of email status.

### 2. **email_success**
Logs when an email is successfully sent (both admin notification and user auto-reply).

### 3. **email_failure**
Logs when email sending fails, includes error details.

## Viewing Logs

### Via API Endpoint
Access logs through the API endpoint:
```
GET /api/logs?date=YYYY-MM-DD
```

### Via Console
Logs are also printed to the console in real-time with formatted output.

### Via File System
Access log files directly from this directory.

## Important Notes

- Log files are **not committed to git** (excluded via .gitignore)
- Each day creates a new log file
- Logs include sensitive user information - keep them secure
- Old logs should be archived or deleted periodically

## Security

⚠️ **Warning**: Log files contain user email addresses, phone numbers, and messages. Ensure:
- This directory has restricted access in production
- Logs are not publicly accessible via web
- Regular cleanup of old logs
- Compliance with privacy regulations (GDPR, etc.)
