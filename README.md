# 🧰 FullStack Backend

A production-ready Node.js backend for a fullstack application with JWT authentication, role-based access, input validation, security best practices, and real-time error monitoring.

## 🌐 Tech Stack

This backend uses the following technologies:

- **Node.js** — server-side runtime
- **Express.js** — minimal web framework
- **MongoDB** — document database via Mongoose
- **Mongoose** — ODM for MongoDB
- **Zod** — schema validation
- **cookie-parser** — for parsing cookies
- **dotenv** — for environment variables
- **cors** — cross-origin support
- **jsonwebtoken** — for JWT access & refresh tokens
- **Sentry** — error monitoring and logging
- **Render** — backend deployment platform

## 🔐 Security Practices

The backend applies multiple security techniques and libraries:

- **Helmet** — sets secure HTTP headers (e.g., XSS protection, no sniff)
- **express-rate-limit** — basic rate limiting to protect against brute-force attacks
- **CORS** — allows only whitelisted origins with `credentials: true`
- **httpOnly cookies** — tokens are stored in cookies to protect from XSS
- **SameSite policy** — uses `'None'` in production for cross-site cookie support
- **Token expiration** — access: 15min, refresh: 7d
- **Zod middleware** — for strict request validation
- **Sanitization middleware** — cleans incoming user input

## 🚀 Features

- Full **JWT auth system** with access and refresh token support
- **User roles** (`user`, `admin`) with protected routes
- **Token refresh flow** on expired access tokens
- **User CRUD** (admin-only)
- Real-time error logging via **Sentry**
- Proper separation of concerns with controller/middleware layers

## 🛋️ API Structure

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `GET /api/user/settings/profile`
- `PUT /api/user/settings/profile`
- `GET /api/dashboard/users`
- `POST /api/dashboard/users`
- `PUT /api/dashboard/users/:id`
- `DELETE /api/dashboard/users/:id`

## 🏠 Folder Structure

- `controllers/` — business logic by domain
- `routes/` — organized Express routes
- `models/` — Mongoose schemas
- `middleware/` — custom auth, validation, sanitization, error layers
- `shared/` — cookies logic, constants
- `.env.example` — environment variable sample
- `.gitignore` — excludes secrets, logs, build files

## ⚠️ Sentry Integration

- Errors are automatically tracked and logged
- Manual test route: `GET /debug-sentry`
- Fully configured with `instrument.js` and `Sentry.setupExpressErrorHandler(app)`

## 🌍 Deployment

- Deployed on **Render**
- `.env` variables set in Render dashboard
- **CORS origin** must match deployed frontend (e.g., Vercel)
- **PORT**: 4000

## 📂 Example `.env`

```
PORT=4000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
JWT_ACCESS_EXPIRES=15m
CLIENT_PORT=https://your-frontend-url
SENTRY_DSN=your-sentry-dsn
```
