import { useCallQueue, speak, formatPickupCode } from "@/store/callQueue"
import { Volume2, SkipForward } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function CallDisplay() {
  const { readyOrders, currentIndex, callRound, next } = useCallQueue()
  const [flashKey, setFlashKey] = useState(0)
  const hasSpokenInitial = useRef(false)

  const order = readyOrders.length > 0 ? readyOrders[currentIndex] : null

  useEffect(() => {
    if (order && !hasSpokenInitial.current) {
      hasSpokenInitial.current = true
      speak(`请 ${order.customerSurname} 师傅，取件码 ${formatPickupCode(order.pickupCode)}，${order.repairType} 可取`)
    }
  }, [order])

  const handleNext = () => {
    if (readyOrders.length === 0) return
    next()
    setFlashKey((k) => k + 1)
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-4 bg-gradient-to-b from-bark-800 to-bark-900 text-bark-50 min-h-[220px]">
      <div className="flex items-center gap-2 text-bark-300 text-xs mb-2">
        <Volume2 className="w-4 h-4" />
        <span>当前叫号</span>
      </div>

      {order ? (
        <div key={flashKey} className="animate-call-flash">
          <div className="text-7xl font-display font-black tracking-wider leading-none text-bark-50 drop-shadow-lg">
            {order.pickupCode}
          </div>
          <div className="mt-2 text-center text-sm text-bark-300">
            {order.customerSurname} · {order.repairType}
          </div>
        </div>
      ) : (
        <div className="text-3xl font-display font-bold text-bark-400">
          暂无可取
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={readyOrders.length === 0}
        className={`
          mt-4 flex items-center gap-2 px-6 py-2.5 rounded-lg
          text-sm font-bold tracking-wide
          transition-all duration-150 active:scale-95
          ${readyOrders.length > 0
            ? "bg-bark-500 hover:bg-bark-400 text-bark-50 shadow-lg hover:shadow-xl"
            : "bg-bark-700 text-bark-500 cursor-not-allowed"
          }
        `}
      >
        <SkipForward className="w-4 h-4" />
        下一个
      </button>

      <div className="mt-2 text-[10px] text-bark-500 font-mono">
        轮次 {callRound}
      </div>
    </div>
  )
}
