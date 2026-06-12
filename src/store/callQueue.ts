import { create } from "zustand"
import type { ShoeOrder } from "@/utils/mockData"

export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = "zh-CN"
    utter.rate = 0.9
    utter.pitch = 1
    utter.volume = 1
    window.speechSynthesis.speak(utter)
  } catch {
    // 忽略语音播报错误，不影响核心功能
  }
}

export function formatPickupCode(code: string): string {
  const letter = code.slice(0, 1)
  const digits = code.slice(1).split("").join(" ")
  return `${letter} ${digits}`
}

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
    set({ readyOrders: orders, currentIndex: 0, callRound: 0 })
  },

  next: () => {
    const { readyOrders, currentIndex, callRound } = get()
    if (readyOrders.length === 0) return
    const nextIndex = (currentIndex + 1) % readyOrders.length
    set({ currentIndex: nextIndex, callRound: callRound + 1 })
    const nextOrder = readyOrders[nextIndex]
    speak(`请 ${nextOrder.customerSurname} 师傅，取件码 ${formatPickupCode(nextOrder.pickupCode)}，${nextOrder.repairType} 可取`)
  },

  currentOrder: () => {
    const { readyOrders, currentIndex } = get()
    if (readyOrders.length === 0) return null
    return readyOrders[currentIndex]
  },
}))
