import { useState, useMemo, useEffect } from "react"
import DateSidebar from "@/components/DateSidebar"
import OrderList from "@/components/OrderList"
import CallDisplay from "@/components/CallDisplay"
import StatusBar from "@/components/StatusBar"
import { mockOrders } from "@/utils/mockData"
import { sortOrders } from "@/utils/sort"
import { filterTodayReady } from "@/utils/filter"
import { useCallQueue } from "@/store/callQueue"
import { Hammer } from "lucide-react"

export default function Home() {
  const [filterToday, setFilterToday] = useState(false)
  const { setReadyOrders, callRound } = useCallQueue()

  const sorted = useMemo(() => sortOrders(mockOrders), [])
  const displayed = useMemo(
    () => (filterToday ? filterTodayReady(sorted) : sorted),
    [filterToday, sorted]
  )

  const readyOrders = useMemo(
    () => displayed.filter((o) => o.isReady),
    [displayed]
  )

  useEffect(() => {
    setReadyOrders(readyOrders)
  }, [readyOrders, setReadyOrders])

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-parchment font-body">
      <DateSidebar
        filterToday={filterToday}
        onToggleFilter={() => setFilterToday((v) => !v)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-5 py-3 bg-bark-800 text-bark-100 border-b-2 border-bark-700">
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-bark-300" />
            <h1 className="text-lg font-display font-bold tracking-wider">
              修鞋摊 · 取件叫号屏
            </h1>
          </div>
          <span className="text-xs text-bark-400 font-mono">
            {new Date().toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </span>
        </header>

        <div className="flex-1 flex min-h-0">
          <OrderList orders={displayed} />
          <CallDisplay />
        </div>

        <StatusBar displayedOrders={displayed} callRound={callRound} />
      </div>
    </div>
  )
}
