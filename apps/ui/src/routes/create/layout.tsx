import { Suspense } from "react"

import { HistoryProvider } from "@/routes/create/hooks/use-history"
import { LocksProvider } from "@/routes/create/hooks/use-locks"

export function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LocksProvider>
      <Suspense>
        <HistoryProvider>{children}</HistoryProvider>
      </Suspense>
    </LocksProvider>
  )
}
