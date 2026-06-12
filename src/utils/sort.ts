import type { ShoeOrder } from "@/utils/mockData"

export function sortOrders(orders: ShoeOrder[]): ShoeOrder[] {
  return [...orders].sort((a, b) => {
    if (a.isReady !== b.isReady) {
      return a.isReady ? -1 : 1
    }
    return a.estimatedPickupDate.localeCompare(b.estimatedPickupDate)
  })
}
