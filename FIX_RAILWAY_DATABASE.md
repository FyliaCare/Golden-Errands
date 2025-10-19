# 🔧 Fix Railway Database Connection

## Current Issue
The Railway server is trying to connect to `postgres.railway.internal:5432` during startup, but the internal networking isn't ready yet, causing the P1001 error.

## ✅ Solution: Update Environment Variable

### Step 1: Go to Railway Dashboard
1. Open https://railway.app/dashboard
2. Click on your project: **refreshing-rejoicing**
3. Find your **Golden Errands app service** (not Postgres)

### Step 2: Update DATABASE_URL Variable
1. Click on the app service
2. Go to **Variables** tab
3. Find `DATABASE_URL` variable
4. **Change it from:**
   ```
   postgresql://postgres:dxwymZlidsOFbBovLpwBtoFfTAOagQpC@postgres.railway.internal:5432/railway
   ```
   
5. **To the PUBLIC URL:**
   ```
   postgresql://postgres:dxwymZlidsOFbBovLpwBtoFfTAOagQpC@turntable.proxy.rlwy.net:43073/railway
   ```

### Step 3: Redeploy
1. After saving the variable, Railway will automatically redeploy
2. OR click **Deploy** → **Redeploy**

---

## Alternative Solution: Use Railway Variable Reference

Instead of hardcoding the URL, you can reference the Postgres service variable:

1. In your app service Variables tab
2. Delete the current `DATABASE_URL` 
3. Add a new variable:
   - **Name:** `DATABASE_URL`
   - **Value:** Click "New Variable" → "Add Reference" → Select `Postgres` service → Select `DATABASE_PUBLIC_URL`

This way, it will automatically use the correct public URL.

---

## Expected Result After Fix

After redeploying with the public URL, you should see:

```
✅ Prisma Client generated
✅ Migrations completed
🌟 Starting server...
╔══════════════════════════════════════════════╗
║         GOLDEN ERRANDS                       ║
║    Server running on port 8080               ║
║    Environment: production                   ║
╚══════════════════════════════════════════════╝
```

Then test registration:
```powershell
$body = @{
  email = "admin@goldenerrands.com"
  password = "Admin123!"
  firstName = "Admin"
  lastName = "User"
  phone = "0256039212"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://golden-errands-production.up.railway.app/api/auth/register" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

Should return:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "admin@goldenerrands.com",
    "firstName": "Admin",
    "lastName": "User"
  },
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## Why This Happens

Railway has two types of database URLs:
- **Internal URL** (`postgres.railway.internal:5432`) - Only works AFTER the Railway internal network is fully initialized
- **Public URL** (`turntable.proxy.rlwy.net:43073`) - Works immediately, accessible from anywhere

During the build/startup phase, the internal network might not be ready, causing P1001 errors. Using the public URL solves this timing issue.
