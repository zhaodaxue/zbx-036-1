import type { ShoeOrder } from "@/utils/mockData"
import { getTodayStr } from "@/utils/filter"
import { usePickupStore } from "@/store/pickupStore"
import { Clock, CheckCircle, RotateCw, Package } from "lucide-react"
import { useMemo } from "react"

interface StatusBarProps {
  displayedOrders: ShoeOrder[]
  callRound: number
}

export default function StatusBar({ displayedOrders, callRound }: StatusBarProps) {
  const { isPickedUp } = usePickupStore()

  const { pendingCount, todayReadyCount, pickedCount } = useMemo(() => {
    const todayStr = getTodayStr()
    let pending = 0
    let todayReady = 0
    let picked = 0
    for (const o of displayedOrders) {
      if (isPickedUp(o.id)) {
        picked++
        continue
      }
      if (!o.isReady) {
        pending++
      }
      if (o.isReady && o.estimatedPickupDate === todayStr) {
        todayReady++
      }
    }
    return { pendingCount: pending, todayReadyCount: todayReady, pickedCount: picked }
  }, [displayedOrders, isPickedUp])

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
      icon: Package,
      label: "本会已取",
      value: pickedCount,
      color: "text-bark-700",
      bg: "bg-bark-200/60",
    },
    {
      icon: RotateCw,
      label: "已叫号轮次",
      value: callRound,
      color: "text-bark-800",
      bg: "bg-bark-200/80",
    },
  ]

  return (
    <footer className="flex border-t-2 border-bark-200 bg-bark-50/80 backdrop-blur-sm">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex-1 flex items-center justify-center gap-3 py-3 border-r last:border-r-0 border-bark-200 ${item.bg}`}
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
