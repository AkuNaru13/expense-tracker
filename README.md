# Expense Tracker

A minimal full-stack expense tracking application built with Next.js.

---

## Features

- Add expenses (amount, category, description, date)
- View list of expenses
- Filter by category
- Sort by date (newest first)
- Display total of visible expenses

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- In-memory data store

---

## API

### POST /api/expenses
Creates a new expense (idempotent via unique ID)

### GET /api/expenses
Returns expenses with:
- category filter
- date sorting

---

## Design Decisions

- Used in-memory storage for simplicity
- Implemented idempotency using UUID
- Focused on correctness over feature complexity

---

## Trade-offs

- Data is not persistent (resets on server restart)
- No authentication
- No database

---

## Run Locally

```bash
npm install
npm run dev



👉 Save the file

---

# STEP 2 — Initialize Git

In your terminal (same folder):

```bash
git init
git add .
git commit -m "initial expense tracker (API + UI complete)"