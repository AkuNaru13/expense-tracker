"use client"

import { useEffect, useState } from "react"

type Expense = {
  id: string
  amount: number
  category: string
  description: string
  date: string
  created_at: string
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)

  // Fetch expenses with filter + sort
  const fetchExpenses = async () => {
    let url = "/api/expenses?"

    if (filter) url += `category=${filter}&`
    if (sort) url += `sort=${sort}`

    const res = await fetch(url)
    const data = await res.json()
    setExpenses(data)
  }

  // Auto-fetch on filter/sort change
  useEffect(() => {
    fetchExpenses()
  }, [filter, sort])

  // Add expense
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const id = crypto.randomUUID()

    await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        amount: Number(amount),
        category,
        description,
        date,
      }),
    })

    // Reset form
    setAmount("")
    setCategory("")
    setDescription("")
    setDate("")

    setLoading(false)
    fetchExpenses()
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white transition
            ${
              loading
                ? "bg-gray-500"
                : "bg-black hover:bg-gray-800 active:scale-95"
            }`}
        >
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>

      {/* Filter + Sort + Clear */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={() =>
            setSort(sort === "date_desc" ? "" : "date_desc")
          }
          className={`px-3 py-2 rounded text-white transition
            ${
              sort === "date_desc"
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700 active:scale-95"
            }`}
        >
          Sort Newest
        </button>

        <button
          onClick={() => {
            setFilter("")
            setSort("")
          }}
          className="bg-gray-400 hover:bg-gray-300 active:scale-95 px-3 py-2 rounded transition"
        >
          Clear
        </button>
      </div>

      {/* Total */}
      <h2 className="text-lg font-semibold mb-2">
        Total: ₹{total}
      </h2>

      {/* List */}
      <ul className="space-y-2">
        {expenses.map((e) => (
          <li key={e.id} className="border p-2">
            <div>
              <b>₹{e.amount}</b> - {e.category}
            </div>
            <div>{e.description}</div>
            <div className="text-sm text-gray-500">{e.date}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}