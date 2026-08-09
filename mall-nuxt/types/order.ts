export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  product_name: string
  price: number
  quantity: number
}

export interface Order {
  id: number
  order_no: string
  user_id: number
  username: string
  nickname: string
  total_amount: number
  status: OrderStatus
  receiver_name: string
  receiver_phone: string
  receiver_address: string
  remark: string
  created_at: string
  items?: OrderItem[]
}