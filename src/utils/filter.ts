import type { ShoeOrder } from "@/utils/mockData"

export function filterTodayReady(orders: ShoeOrder[]): ShoeOrder[] {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  return orders.filter((o) => o.isReady && o.estimatedPickupDate === todayStr)
}

export function getTodayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}
