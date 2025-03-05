import { Suspense } from "react"
import Dashboard from "@/components/dashboard"
import LoadingSkeleton from "@/components/loading-skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSkeleton />}>
        <Dashboard />
      </Suspense>
    </main>
  )
}

