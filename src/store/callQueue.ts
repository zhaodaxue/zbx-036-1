import { create } from "zustand"
import type { ShoeOrder } from "@/utils/mockData"

interface CallQueueState {
  readyOrders: ShoeOrder[]
  currentIndex: number
  callRound: number
  setReadyOrders: (orders: ShoeOrder[]) => void
  next: () => void
  currentOrder: () => ShoeOrder | null
}

export const useCallQueue = create<CallQueueState>((set, get) => ({
  readyOrders: [],
  currentIndex: 0,
  callRound: 0,

  setReadyOrders: (orders) => {
    set({ readyOrders: orders, currentIndex: 0 })
  },

  next: () => {
    const { readyOrders, currentIndex, callRound } = get()
    if (readyOrders.length === 0) return
    const nextIndex = (currentIndex + 1) % readyOrders.length
    set({ currentIndex: nextIndex, callRound: callRound + 1 })
  },

  currentOrder: () => {
    const { readyOrders, currentIndex } = get()
    if (readyOrders.length === 0) return null
    return readyOrders[currentIndex]
  },
}))
