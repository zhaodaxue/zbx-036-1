import type { ShoeOrder } from "@/utils/mockData"
import { getTodayStr } from "@/utils/filter"
import { Clock, CheckCircle, RotateCw } from "lucide-react"

interface StatusBarProps {
  displayedOrders: ShoeOrder[]
  callRound: number
}

export default function StatusBar({ displayedOrders, callRound }: StatusBarProps) {
  const pendingCount = displayedOrders.filter((o) => !o.isReady).length
  const todayStr = getTodayStr()
  const todayReadyCount = displayedOrders.filter(
    (o) => o.isReady && o.estimatedPickupDate === todayStr
  ).length

  const items = [
    {
      icon: Clock,
      label: "待取数",
      value: pendingCount,
      color: "text-bark-500",
      bg: "bg-bark-50",
    },
    {
      icon: CheckCircle,
      label: "今日可取",
      value: todayReadyCount,
      color: "text-bark-600",
      bg: "bg-bark-100",
    },
    {
      icon: RotateCw,
      label: "已叫号轮次",
      value: callRound,
      color: "text-bark-700",
      bg: "bg-bark-200/50",
    },
  ]

  return (
    <footer className="flex border-t-2 border-bark-200 bg-bark-50/80 backdrop-blur-sm">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex-1 flex items-center justify-center gap-3 py-3 ${item.bg}`}
        >
          <item.icon className={`w-5 h-5 ${item.color} opacity-70`} />
          <span className="text-xs text-bark-400">{item.label}</span>
          <span className={`text-2xl font-display font-black ${item.color}`}>
            {item.value}
          </span>
        </div>
      ))}
    </footer>
  )
}
