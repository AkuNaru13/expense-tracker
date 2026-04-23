import { NextRequest, NextResponse } from "next/server"
import { addExpense, getExpenses } from "../../../lib/store"

// POST /api/expenses
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { id, amount, category, description, date } = body

    // Validation
    if (!id || !amount || !category || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      )
    }

    const expense = {
      id,
      amount,
      category,
      description: description || "",
      date,
      created_at: new Date().toISOString()
    }

    const saved = addExpense(expense)

    return NextResponse.json(saved, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}

// GET /api/expenses
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const category = searchParams.get("category")
    const sort = searchParams.get("sort")

    let data = getExpenses()

    // Filter by category
    if (category) {
      data = data.filter(e => e.category === category)
    }

    // Sort by date (newest first)
    if (sort === "date_desc") {
      data = data.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }

    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    )
  }
}