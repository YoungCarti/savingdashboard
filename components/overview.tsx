"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    savings: 2400,
    expenses: 3200,
  },
  {
    name: "Feb",
    savings: 3000,
    expenses: 3100,
  },
  {
    name: "Mar",
    savings: 3500,
    expenses: 3000,
  },
  {
    name: "Apr",
    savings: 4000,
    expenses: 3200,
  },
  {
    name: "May",
    savings: 4500,
    expenses: 3100,
  },
  {
    name: "Jun",
    savings: 5000,
    expenses: 3300,
  },
  {
    name: "Jul",
    savings: 5280,
    expenses: 3200,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, ""]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="savings" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

