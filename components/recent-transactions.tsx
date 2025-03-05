import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowDownIcon, ArrowUpIcon, ShoppingBag, Coffee, Home, Car, Utensils } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  date: string
  description: string
  category: string
  type: "expense" | "income"
}

const transactions: Transaction[] = [
  {
    id: "1",
    amount: 120,
    date: "2025-03-05",
    description: "Grocery Shopping",
    category: "Food",
    type: "expense",
  },
  {
    id: "2",
    amount: 45,
    date: "2025-03-04",
    description: "Coffee Shop",
    category: "Entertainment",
    type: "expense",
  },
  {
    id: "3",
    amount: 1200,
    date: "2025-03-03",
    description: "Rent Payment",
    category: "Housing",
    type: "expense",
  },
  {
    id: "4",
    amount: 4500,
    date: "2025-03-01",
    description: "Salary Deposit",
    category: "Income",
    type: "income",
  },
  {
    id: "5",
    amount: 85,
    date: "2025-02-28",
    description: "Gas Station",
    category: "Transportation",
    type: "expense",
  },
  {
    id: "6",
    amount: 65,
    date: "2025-02-27",
    description: "Restaurant",
    category: "Food",
    type: "expense",
  },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food":
      return <Utensils className="h-4 w-4" />
    case "Entertainment":
      return <Coffee className="h-4 w-4" />
    case "Housing":
      return <Home className="h-4 w-4" />
    case "Transportation":
      return <Car className="h-4 w-4" />
    default:
      return <ShoppingBag className="h-4 w-4" />
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

interface RecentTransactionsProps {
  showAll?: boolean
}

export function RecentTransactions({ showAll = false }: RecentTransactionsProps) {
  const displayTransactions = showAll ? transactions : transactions.slice(0, 5)

  return (
    <div className="space-y-8">
      {displayTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={transaction.category} />
            <AvatarFallback className={transaction.type === "expense" ? "bg-red-100" : "bg-green-100"}>
              {getCategoryIcon(transaction.category)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
          </div>
          <div className="ml-auto font-medium flex items-center">
            {transaction.type === "expense" ? (
              <>
                <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
                <span className="text-red-500">-${transaction.amount}</span>
              </>
            ) : (
              <>
                <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-500">+${transaction.amount}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

