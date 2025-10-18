# Golden Errands API Testing Guide

This guide provides sample API requests for testing all endpoints using Postman, curl, or any HTTP client.

## Base URL

```
Development: http://localhost:4000/api
Production: https://api.goldenerrands.com/api
```

## Authentication

Most endpoints require a Bearer token. Get your token by logging in first.

### 1. Register New User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "0244123456",
  "role": "CUSTOMER"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "newuser@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@goldenerrands.com",
  "password": "admin@2024"
}
```

**PowerShell curl:**
```powershell
curl -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@goldenerrands.com\",\"password\":\"admin@2024\"}'
```

### 3. Get User Profile

```http
GET /auth/profile
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 4. Refresh Access Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

### 5. Logout

```http
POST /auth/logout
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

## Orders

### 1. Create Order

```http
POST /orders
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "pickupAddress": "Accra Mall, Accra",
  "pickupLat": 5.603717,
  "pickupLng": -0.186964,
  "pickupContact": "0244123456",
  "pickupInstructions": "Meet at main entrance",
  
  "deliveryAddress": "East Legon, Accra",
  "deliveryLat": 5.650000,
  "deliveryLng": -0.166667,
  "deliveryContact": "0244654321",
  "deliveryInstructions": "Call upon arrival",
  
  "recipientName": "Jane Doe",
  "recipientPhone": "0244654321",
  
  "deliveryType": "PARCEL_DELIVERY",
  "packageSize": "MEDIUM",
  "packageDescription": "Electronics - Handle with care",
  "packageValue": 500,
  "weight": 2.5,
  
  "scheduledPickupTime": "2024-10-20T10:00:00Z",
  "scheduledDeliveryTime": "2024-10-20T14:00:00Z",
  "deliveryTimeWindow": "2PM - 4PM",
  
  "paymentMethod": "CASH_ON_DELIVERY"
}
```

**Minimal Order (required fields only):**
```json
{
  "pickupAddress": "Accra Mall",
  "deliveryAddress": "East Legon",
  "deliveryType": "PARCEL_DELIVERY"
}
```

### 2. Get All Orders

```http
GET /orders?status=PENDING&page=1&limit=20
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Query Parameters:**
- `status`: PENDING, CONFIRMED, ASSIGNED, PICKED_UP, IN_TRANSIT, DELIVERED, FAILED, CANCELLED
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

### 3. Get Single Order

```http
GET /orders/{orderId}
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 4. Assign Order to Driver (Admin/Dispatch only)

```http
PUT /orders/{orderId}/assign
Authorization: Bearer ADMIN_OR_DISPATCH_TOKEN
Content-Type: application/json

{
  "driverId": "driver-uuid-here"
}
```

### 5. Update Order Status

```http
PUT /orders/{orderId}/status
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "status": "PICKED_UP",
  "notes": "Package collected from sender"
}
```

**Valid Status Values:**
- PENDING
- CONFIRMED
- ASSIGNED
- PICKED_UP
- IN_TRANSIT
- DELIVERED
- FAILED
- CANCELLED

## Users (Admin Only)

### 1. Get All Users

```http
GET /users?role=DRIVER&status=ACTIVE&page=1&limit=20
Authorization: Bearer ADMIN_TOKEN
```

### 2. Get User by ID

```http
GET /users/{userId}
Authorization: Bearer ADMIN_TOKEN
```

### 3. Update User Status

```http
PUT /users/{userId}/status
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "status": "ACTIVE"
}
```

**Valid Status Values:**
- ACTIVE
- INACTIVE
- SUSPENDED

## Drivers

### 1. Get All Drivers (Admin/Dispatch only)

```http
GET /drivers?isAvailable=true
Authorization: Bearer ADMIN_OR_DISPATCH_TOKEN
```

### 2. Update Driver Location (Driver only)

```http
POST /drivers/{driverId}/location
Authorization: Bearer DRIVER_TOKEN
Content-Type: application/json

{
  "lat": 5.603717,
  "lng": -0.186964
}
```

### 3. Update Driver Availability (Driver only)

```http
PUT /drivers/{driverId}/availability
Authorization: Bearer DRIVER_TOKEN
Content-Type: application/json

{
  "isAvailable": true
}
```

## Complete Workflow Example

### Scenario: Customer creates order, admin assigns driver, driver delivers

**Step 1: Customer logs in**
```bash
POST /auth/login
{
  "email": "customer@example.com",
  "password": "customer@2024"
}
# Save accessToken
```

**Step 2: Customer creates order**
```bash
POST /orders
Authorization: Bearer CUSTOMER_TOKEN
{
  "pickupAddress": "Accra Mall",
  "deliveryAddress": "East Legon",
  "deliveryType": "FOOD_DELIVERY",
  "recipientPhone": "0244123456"
}
# Save orderId
```

**Step 3: Admin logs in**
```bash
POST /auth/login
{
  "email": "admin@goldenerrands.com",
  "password": "admin@2024"
}
# Save admin accessToken
```

**Step 4: Admin gets available drivers**
```bash
GET /drivers?isAvailable=true
Authorization: Bearer ADMIN_TOKEN
# Select a driverId
```

**Step 5: Admin assigns order to driver**
```bash
PUT /orders/{orderId}/assign
Authorization: Bearer ADMIN_TOKEN
{
  "driverId": "selected-driver-uuid"
}
```

**Step 6: Driver logs in**
```bash
POST /auth/login
{
  "email": "kwame.rider@goldenerrands.com",
  "password": "driver@2024"
}
```

**Step 7: Driver views assigned orders**
```bash
GET /orders
Authorization: Bearer DRIVER_TOKEN
```

**Step 8: Driver updates location**
```bash
POST /drivers/{driverId}/location
Authorization: Bearer DRIVER_TOKEN
{
  "lat": 5.603717,
  "lng": -0.186964
}
```

**Step 9: Driver picks up order**
```bash
PUT /orders/{orderId}/status
Authorization: Bearer DRIVER_TOKEN
{
  "status": "PICKED_UP",
  "notes": "Package collected"
}
```

**Step 10: Driver marks in transit**
```bash
PUT /orders/{orderId}/status
Authorization: Bearer DRIVER_TOKEN
{
  "status": "IN_TRANSIT",
  "notes": "On the way to delivery location"
}
```

**Step 11: Driver completes delivery**
```bash
PUT /orders/{orderId}/status
Authorization: Bearer DRIVER_TOKEN
{
  "status": "DELIVERED",
  "notes": "Package delivered successfully"
}
```

## Testing with PowerShell

### Save token to variable:
```powershell
$loginResponse = curl -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@goldenerrands.com\",\"password\":\"admin@2024\"}' | ConvertFrom-Json

$token = $loginResponse.accessToken
```

### Use token in requests:
```powershell
curl -X GET http://localhost:4000/api/orders `
  -H "Authorization: Bearer $token"
```

## Postman Collection

Import this collection into Postman for easier testing:

1. Create new collection: "Golden Errands API"
2. Set base URL variable: `{{baseUrl}}` = `http://localhost:4000/api`
3. Set environment variables:
   - `accessToken` - Your access token
   - `orderId` - Test order ID
   - `driverId` - Test driver ID

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "details": [
    {
      "field": "email",
      "message": "Valid email required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Order not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

## Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per IP
- **Header:** `X-RateLimit-Remaining`

When exceeded:
```json
{
  "message": "Too many requests from this IP, please try again later."
}
```

## Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-10-18T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

---

## Tips for Testing

1. **Use Postman Environment Variables:**
   - Store tokens automatically
   - Reuse order IDs
   - Quick role switching

2. **Test Role Permissions:**
   - Try customer accessing admin endpoints (should fail)
   - Verify drivers can only see their orders
   - Check finance user access

3. **Test Error Cases:**
   - Invalid credentials
   - Missing required fields
   - Invalid order status transitions
   - Duplicate email registration

4. **Monitor Logs:**
   ```powershell
   Get-Content backend/logs/combined.log -Tail 50 -Wait
   ```

---

**Happy Testing!** 🧪

*For issues or questions, check INSTALLATION.md or contact: info@goldenerrands.com*
