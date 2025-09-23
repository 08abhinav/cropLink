
---

# 🔗 CropLink - URL Shortener and Tracker

CropLink is a full-stack web application that allows users to shorten long URLs, customize urls, track clicks, and manage their link history from a personalized dashboard.

---

## 🚀 Features

* 🔐 **Authentication with Clerk**

  * Users can securely register, log in, and manage sessions using **Clerk**.
  * Clerk provides a pre-built authentication flow (sign-up, login, logout, forgot password) with support for social logins.

* ✂️ **Custom URL Shortening**

  * Users can generate short URLs automatically, **or create custom short codes** (e.g., `croplink.io/mybrand`).

* ⏳ **URL Expiration**

  * All shortened URLs automatically **expire 12 hours** after creation.
  * After expiration, attempting to access the URL will show an **"expired link"** page instead of redirecting.


* 📊 **Dashboard**

  * View stats like total links, total clicks, last activity.
  * Each short URL shows:

    * Original URL
    * Click count
    * Expiration status
    * Date created

* 🔁 **Redirection**

  * Short URLs seamlessly redirect to the original destination until they expire.

* ⏱️ **Click Tracking**

  * Every visit increments a counter in real-time.
  * Tracks metrics like **last clicked time** and **total clicks** per URL.

* 🧠 **Componentized Frontend**

  * Built with **React + TypeScript**, styled with **Tailwind + Shadcn/UI** for a modern and responsive UI.

* 🌐 **REST API**

  * Built with **Go (Fiber + GORM + PostgreSQL)**.
  * Handles authentication, URL shortening, redirection, expiration, and analytics.

---

## 🛠️ Tech Stack

| Backend      | Frontend             |
| ------------ | -------------------- |
| Go (Golang)  | React + TypeScript   |
| Fiber (Web)  | Tailwind CSS         |
| GORM (ORM)   | Shadcn/UI Components |
| PostgreSQL   | Axios                |
| Clerk (Auth) | React Router DOM     |

---
