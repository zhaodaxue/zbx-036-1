export interface ShoeOrder {
  id: string
  pickupCode: string
  customerSurname: string
  repairType: "换底" | "缝边" | "上色"
  estimatedPickupDate: string
  isReady: boolean
}

const today = new Date()
const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r }

export const mockOrders: ShoeOrder[] = [
  {
    id: "1",
    pickupCode: "A017",
    customerSurname: "王",
    repairType: "换底",
    estimatedPickupDate: fmt(today),
    isReady: true,
  },
  {
    id: "2",
    pickupCode: "A018",
    customerSurname: "李",
    repairType: "缝边",
    estimatedPickupDate: fmt(today),
    isReady: true,
  },
  {
    id: "3",
    pickupCode: "A019",
    customerSurname: "张",
    repairType: "上色",
    estimatedPickupDate: fmt(today),
    isReady: true,
  },
  {
    id: "4",
    pickupCode: "A020",
    customerSurname: "陈",
    repairType: "换底",
    estimatedPickupDate: fmt(addDays(today, 1)),
    isReady: false,
  },
  {
    id: "5",
    pickupCode: "A021",
    customerSurname: "赵",
    repairType: "缝边",
    estimatedPickupDate: fmt(addDays(today, 1)),
    isReady: false,
  },
  {
    id: "6",
    pickupCode: "A022",
    customerSurname: "刘",
    repairType: "上色",
    estimatedPickupDate: fmt(today),
    isReady: false,
  },
  {
    id: "7",
    pickupCode: "A023",
    customerSurname: "孙",
    repairType: "换底",
    estimatedPickupDate: fmt(addDays(today, 2)),
    isReady: false,
  },
  {
    id: "8",
    pickupCode: "A024",
    customerSurname: "周",
    repairType: "缝边",
    estimatedPickupDate: fmt(addDays(today, -1)),
    isReady: true,
  },
  {
    id: "9",
    pickupCode: "A025",
    customerSurname: "吴",
    repairType: "上色",
    estimatedPickupDate: fmt(addDays(today, 3)),
    isReady: false,
  },
  {
    id: "10",
    pickupCode: "A026",
    customerSurname: "郑",
    repairType: "换底",
    estimatedPickupDate: fmt(addDays(today, 2)),
    isReady: true,
  },
]
