"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { PlusCircle } from "lucide-react"

interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  spent: number
  color: string
}

export function Budget() {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: "1",
      name: "Housing",
      budgeted: 1500,
      spent: 1200,
      color: "#4ade80",
    },
    {
      id: "2",
      name: "Food",
      budgeted: 600,
      spent: 450,
      color: "#60a5fa",
    },
    {
      id: "3",
      name: "Transportation",
      budgeted: 400,
      spent: 350,
      color: "#f97316",
    },
    {
      id: "4",
      name: "Entertainment",
      budgeted: 300,
      spent: 275,
      color: "#8b5cf6",
    },
    {
      id: "5",
      name: "Utilities",
      budgeted: 250,
      spent: 225,
      color: "#ec4899",
    },
    {
      id: "6",
      name: "Savings",
      budgeted: 1000,
      spent: 1000,
      color: "#14b8a6",
    },
  ])

  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryBudget, setNewCategoryBudget] = useState("")

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryBudget) {
      const colors = ["#4ade80", "#60a5fa", "#f97316", "#8b5cf6", "#ec4899", "#14b8a6", "#f43f5e"]

      const newCategory: BudgetCategory = {
        id: Date.now().toString(),
        name: newCategoryName,
        budgeted: Number.parseFloat(newCategoryBudget),
        spent: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setCategories([...categories, newCategory])
      setNewCategoryName("")
      setNewCategoryBudget("")
    }
  }

  const calculateProgress = (spent: number, budgeted: number) => {
    return Math.min(Math.round((spent / budgeted) * 100), 100)
  }

  const totalBudgeted = categories.reduce((sum, category) => sum + category.budgeted, 0)
  const totalSpent = categories.reduce((sum, category) => sum + category.spent, 0)

  const pieData = categories.map((category) => ({
    name: category.name,
    value: category.budgeted,
    color: category.color,
  }))

  const spendingData = categories.map((category) => ({
    name: category.name,
    value: category.spent,
    color: category.color,
  }))

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Monthly budget allocation: ${totalBudgeted.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Budgeted"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>
              Monthly spending: ${totalSpent.toLocaleString()} of ${totalBudgeted.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Spent"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Categories</CardTitle>
          <CardDescription>Track your spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="categories" className="space-y-4">
            <TabsList>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="add">Add New</TabsTrigger>
            </TabsList>
            <TabsContent value="categories" className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm">
                      ${category.spent.toLocaleString()} of ${category.budgeted.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={calculateProgress(category.spent, category.budgeted)} />
                    <span className="text-sm w-12 text-right">
                      {calculateProgress(category.spent, category.budgeted)}%
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="add" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    placeholder="e.g., Groceries"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-budget">Monthly Budget ($)</Label>
                  <Input
                    id="category-budget"
                    type="number"
                    placeholder="500"
                    value={newCategoryBudget}
                    onChange={(e) => setNewCategoryBudget(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddCategory}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

