import { create } from "zustand"

interface PickupStore {
  pickedUpIds: Set<string>
  togglePickedUp: (id: string) => void
  isPickedUp: (id: string) => boolean
}

export const usePickupStore = create<PickupStore>((set, get) => ({
  pickedUpIds: new Set<string>(),

  togglePickedUp: (id) => {
    const next = new Set(get().pickedUpIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    set({ pickedUpIds: next })
  },

  isPickedUp: (id) => get().pickedUpIds.has(id),
}))
