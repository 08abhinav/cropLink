# CropLink - URL Shortener and Tracker

CropLink is a full-stack web application that allows users to shorten long URLs, customize urls, track clicks, and manage their link history from a personalized dashboard.

---

## Features

**Authentication with Clerk**
  * Users can securely register, log in, and manage sessions using **Clerk**.
  * Clerk provides a pre-built authentication flow (sign-up, login, logout, forgot password) with support for social logins.

 **Custom URL Shortening**
  * Users can generate short URLs automatically, **or create custom short codes** (e.g., `croplink.io/mybrand`).

 **URL Expiration**
  * All shortened URLs automatically **expire 6 hours** after creation.
  * After expiration, attempting to access the URL will show an **"expired link"** page instead of redirecting.


 **Dashboard**
  * View stats like total links, total clicks, last activity.
  * Each short URL shows:
    * Original URL
    * Click count
    * Expiration status
    * Date created

 **Redirection**
  * Short URLs seamlessly redirect to the original destination until they expire.

 **Click Tracking**
  * Every visit increments a counter in real-time.
  * Tracks metrics like **last clicked time** and **total clicks** per URL.

 **Componentized Frontend**
  * Built with **React + TypeScript**, styled with **Tailwind + Shadcn/UI** for a modern and responsive UI.

 **REST API**
  * Built with **Go (Fiber + GORM + PostgreSQL)**.
  * URL shortening, redirection, expiration, and analytics.

---

## Tech Stack

| Backend      | Frontend             |
| ------------ | -------------------- |
| Go (Golang)  | React + TypeScript   |
| Fiber (Web)  | Tailwind CSS         |
| GORM (ORM)   | Shadcn/UI Components |
| PostgreSQL   | Axios                |
| Clerk (Auth) | React Router DOM     |

---
## Containerization
CropLink is fully containerized using Docker.

Services are isolated into independent containers:
* Frontend container
* Backend container
* PostgreSQL container

### Benefits:
* Environment consistency
* Easy deployment
* Simplified local setup
* Clean service networking
* Dockerized services communicate using internal Docker network.

## System Architecture
  User
    ↓
  Frontend (React)
    ↓
  Backend (Go Fiber)
    ↓
  PostgreSQL

---

## Installation and Setup
### Clone Repository

```bash
https://github.com/08abhinav/cropLink.git
```

### Backend setup

```bash
cd backend
go mod tidy
```
* Create a .env file and add required backend variables:
```text
  JWT_SECRETKEY
  DB_HOST
  DB_PORT
  DB_USER
  DB_PASSWORD
  DB_DBNAME
  DB_SSLMODE
  CLERK_SECRET_KEY
```
* Run backend
```bash
go run main.go
```

### Frontend setup

```bash
cd frontend
npm install
```

* Create a .env file and add required backend variables:
```text
  VITE_BACKEND_BASE_URL
  VITE_PUBLISHABLE_KEY
```
* Run frontend
```bash
npm run dev
```

### Docker setup
* After successfully creating the frontend and backend run

### NOTE: Make sure you have docker and docker-compose installed locally
```bash
docker compose up --build
```
This starts:
- frontend service
- backend service
- postgres service

---