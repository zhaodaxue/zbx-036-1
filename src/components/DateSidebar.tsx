import { getTodayStr } from "@/utils/filter"
import { Calendar } from "lucide-react"

interface DateSidebarProps {
  filterToday: boolean
  onToggleFilter: () => void
}

export default function DateSidebar({ filterToday, onToggleFilter }: DateSidebarProps) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"]
  const weekday = weekdays[now.getDay()]
  const todayStr = getTodayStr()

  return (
    <aside
      onClick={onToggleFilter}
      className={`
        relative flex flex-col items-center justify-center
        w-20 min-h-0 cursor-pointer select-none
        transition-colors duration-300 border-r-2
        ${filterToday
          ? "bg-bark-600 text-bark-50 border-bark-700"
          : "bg-bark-800 text-bark-100 border-bark-700"
        }
      `}
    >
      {filterToday && (
        <div className="absolute inset-0 animate-pulse-amber pointer-events-none" />
      )}

      <Calendar className="w-5 h-5 mb-2 opacity-60" />
      <span className="text-xs font-light tracking-widest opacity-70">{year}</span>
      <span className="text-2xl font-bold leading-tight">{month}</span>
      <span className="text-4xl font-display font-black leading-none">{day}</span>
      <span className="text-sm mt-1 opacity-80">周{weekday}</span>

      <div className="mt-4 px-2 py-1 rounded text-[10px] leading-tight text-center whitespace-pre-line opacity-80">
        {filterToday ? "全部\n订单" : "今日\n可取"}
      </div>

      <div className="mt-3 text-[9px] opacity-40 font-mono">{todayStr}</div>
    </aside>
  )
}
