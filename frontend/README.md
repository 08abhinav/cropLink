Got it 🚀
Right now your **README** is still the default Vite template. Since you’ve switched to **Clerk authentication**, let’s rewrite it so anyone cloning your project understands **what it does, how to set it up, and how Clerk fits in**.

Here’s a cleaned-up **`README.md`** for your **CropLink** project with Clerk auth:

---

# 🌱 CropLink – URL Shortener with Clerk Authentication

CropLink is a **URL shortening platform** built with:

* ⚡ **Frontend**: React + TypeScript + Vite + TailwindCSS + ShadCN/UI
* 🔑 **Authentication**: [Clerk](https://clerk.com) (secure login, signup, and user sessions)
* 🗄️ **Backend**: Go (Fiber + GORM + PostgreSQL)
* 📊 **Features**: User dashboards, link management, stats tracking (clicks, total links, last created URL)

---

## 🚀 Features

* 🔐 **Authentication via Clerk**

  * Login, signup, and session management fully handled by Clerk.
* 🔗 **URL Shortening**

  * Users can create shortened URLs tied to their account.
* 📊 **Dashboard**

  * Track stats like total links, total clicks, and last created link.
* 🎨 **Modern UI**

  * TailwindCSS + ShadCN for polished, responsive design.
* 🌍 **Persistent Sessions**

  * Stay logged in even after refreshing (Clerk session tokens).

---

## 🛠️ Tech Stack

* **Frontend**: React + TypeScript + Vite
* **Auth**: Clerk
* **Styling**: TailwindCSS + ShadCN/UI
* **Backend**: Go (Fiber, GORM, PostgreSQL)
* **DB**: PostgreSQL

---

## ⚙️ Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/croplink.git
cd croplink
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

#### Clerk Configuration

Create a `.env` in `frontend/` with your Clerk keys:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_CLERK_SECRET_KEY=your-clerk-secret-key
```

Wrap your app with `ClerkProvider` in `main.tsx`:

```tsx
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <App />
  </ClerkProvider>
);
```

Run the frontend:

```bash
npm run dev
```

---

### 3. Backend Setup

```bash
cd backend
go mod tidy
```

#### Create `.env`

```bash
DATABASE_URL=postgres://user:password@localhost:5432/croplink
JWT_SECRETKEY=your-secret
PORT=8080
```

Run migrations:

```bash
go run main.go
```

---

## 🔐 How Auth Works

* The **frontend** handles login/signup with Clerk.
* Clerk provides a session cookie (`__session`).
* The **backend** verifies this session token (using Clerk’s Go SDK or HTTP API).
* Protected routes (`/url/createUrl`, `/url/getStats`, etc.) require valid Clerk authentication.

---

## 🖼️ Example Dashboard

* **Welcome message** with user’s Clerk name/email.
* **Stats cards** (Total Links, Total Clicks, Last Created URL).
* **User’s URLs** with redirect & click tracking.

---

## 📜 Scripts

Frontend:

```bash
npm run dev   # start dev server
npm run build # build for production
```

Backend:

```bash
go run main.go # start backend server
```

---

