import type { ShoeOrder } from "@/utils/mockData"
import { useCallQueue } from "@/store/callQueue"

interface OrderListProps {
  orders: ShoeOrder[]
}

const repairTypeIcon: Record<string, string> = {
  "换底": "🦶",
  "缝边": "🧵",
  "上色": "🎨",
}

export default function OrderList({ orders }: OrderListProps) {
  const currentOrder = useCallQueue((s) => s.readyOrders[s.currentIndex])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
      {orders.length === 0 && (
        <div className="text-center text-bark-400 py-12 text-lg">
          暂无符合条件的订单
        </div>
      )}
      {orders.map((order, idx) => {
        const isCurrent = currentOrder?.id === order.id && order.isReady
        return (
          <div
            key={order.id}
            className={`
              relative flex items-center gap-3 px-4 py-3 rounded-lg
              border transition-all duration-200
              animate-fade-in-up
              ${order.isReady
                ? "bg-bark-50 border-bark-200 shadow-sm"
                : "bg-white/50 border-bark-100"
              }
              ${isCurrent ? "ring-2 ring-bark-400 shadow-md" : ""}
            `}
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            {order.isReady && (
              <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-bark-500" />
            )}

            <span
              className={`
                text-lg font-bold font-mono min-w-[4rem]
                ${order.isReady ? "text-bark-700" : "text-bark-400"}
              `}
            >
              {order.pickupCode}
            </span>

            <span className="text-base text-charcoal font-medium min-w-[2.5rem]">
              {order.customerSurname}
            </span>

            <span
              className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                ${order.repairType === "换底" ? "bg-bark-100 text-bark-700" : ""}
                ${order.repairType === "缝边" ? "bg-amber-400/20 text-amber-600" : ""}
                ${order.repairType === "上色" ? "bg-bark-200/60 text-bark-800" : ""}
              `}
            >
              <span className="text-sm">{repairTypeIcon[order.repairType]}</span>
              {order.repairType}
            </span>

            <span className="text-xs text-bark-400 ml-auto font-mono">
              {order.estimatedPickupDate}
            </span>

            {order.isReady ? (
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-bark-500 text-bark-50 whitespace-nowrap">
                可取
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-bark-100 text-bark-400 whitespace-nowrap">
                修理中
              </span>
            )}

            {isCurrent && (
              <span className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-bark-600 text-bark-50 animate-stamp-in">
                叫号中
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
