"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PlusCircle } from "lucide-react"

interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
}

export function SavingsGoals() {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 5280,
      targetDate: "2025-12-31",
    },
    {
      id: "2",
      name: "Vacation",
      targetAmount: 3000,
      currentAmount: 1500,
      targetDate: "2025-06-30",
    },
    {
      id: "3",
      name: "New Laptop",
      targetAmount: 2000,
      currentAmount: 800,
      targetDate: "2025-09-15",
    },
  ])

  const [newGoalName, setNewGoalName] = useState("")
  const [newGoalAmount, setNewGoalAmount] = useState("")
  const [newGoalDate, setNewGoalDate] = useState("")

  const handleAddGoal = () => {
    if (newGoalName && newGoalAmount && newGoalDate) {
      const newGoal: SavingsGoal = {
        id: Date.now().toString(),
        name: newGoalName,
        targetAmount: Number.parseFloat(newGoalAmount),
        currentAmount: 0,
        targetDate: newGoalDate,
      }

      setGoals([...goals, newGoal])
      setNewGoalName("")
      setNewGoalAmount("")
      setNewGoalDate("")
    }
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const daysRemaining = (dateString: string) => {
    const targetDate = new Date(dateString)
    const today = new Date()
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <Card key={goal.id}>
          <CardHeader>
            <CardTitle>{goal.name}</CardTitle>
            <CardDescription>
              Target: ${goal.targetAmount.toLocaleString()} by {formatDate(goal.targetDate)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                </span>
                <span className="text-sm font-medium">{calculateProgress(goal.currentAmount, goal.targetAmount)}%</span>
              </div>
              <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} />
            </div>
            <div className="text-sm text-muted-foreground">{daysRemaining(goal.targetDate)} days remaining</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Add Funds
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
          <CardDescription>Create a new savings goal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              placeholder="e.g., New Car"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal-amount">Target Amount ($)</Label>
            <Input
              id="goal-amount"
              type="number"
              placeholder="5000"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal-date">Target Date</Label>
            <Input id="goal-date" type="date" value={newGoalDate} onChange={(e) => setNewGoalDate(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAddGoal}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Goal
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

