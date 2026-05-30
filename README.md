# 🚗 SAP Race

**Score:** **385 / 400**

**Live Demo:** https://sap-race.netlify.app

## ✅ Checklist

### 🚀 UI Deployment

* [x] Deployment Platform

### ✅ Requirements to Commits and Repository

* [x] Commit guidelines compliance
* [x] Checklist included in README.md
* [x] Score calculation
* [x] UI Deployment link in README.md

### Basic Structure (80 / 80)

* [x] Two Views
* [x] Garage View Content
* [x] Winners View Content
* [x] Persistent State

### Garage View (80 / 90)

* [x] CRUD Operations
* [x] Color Selection
* [x] Random Car Creation
* [x] Car Management Buttons
* [x] Pagination
* [x] Empty Garage
* [ ] Empty Garage Page

### Winners View (50 / 50)

* [x] Display Winners
* [x] Pagination for Winners
* [x] Winners Table
* [x] Sorting Functionality

### Race (170 / 170)

* [x] Start Engine Animation
* [x] Stop Engine Animation
* [x] Responsive Animation
* [x] Start Race Button
* [x] Reset Race Button
* [x] Winner Announcement
* [x] Button States
* [x] Actions During Race

### 🎨 Prettier and ESLint Configuration (5 / 10)

* [x] Prettier Setup
* [ ] ESLint Configuration

---

## 📊 Final Score

### 385 / 400

Missing:

* Empty Garage Page (10 pts)
* ESLint Configuration (5 pts)

---

## 🔧 Environment Variables

Before running the application, create a `.env` file in the project's root directory and add the following variable:

```env
VITE_API_URL=http://127.0.0.1:3000
```

Replace the value with the URL of your API server if it differs from the example above.

The application uses this variable to communicate with the backend for managing cars, engines, races, and winners.

---

## 🚀 Installation

```bash
git clone <repository-url>
cd project-name
pnpm install
```

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:3000
```

Start the development server:

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

### Format

```bash
pnpm run format
```

### Format Check

```bash
pnpm run ci:format
```
