import { DiscountTypeEnum, ORDER_STATUS, ORDER_SUB_TYPE, ORDER_TYPE } from "../../../../constants/data"

export interface IOrder {
  id: string
  created_at?: Date
  updated_at?: Date
  order_number: string
  total_quantity: number
  expired_at?: Date
  total_price: number
  total_discount_price: number
  total_net_price: number
  type: ORDER_TYPE
  sub_type: ORDER_SUB_TYPE
  status: ORDER_STATUS
  order_details: IOrderDetail[]
}

export interface IOrderDetail {
  id: string
  other_id?: string
  event_id?: string
  membership_id?: string
  product_id?: string
  item_name: string
  item_sku: string
  description: string
  weight: number
  image_url?: string
  type: ORDER_SUB_TYPE
  quantity: number
  base_price: number
  price: number
  discount_type: DiscountTypeEnum
  discount: number
  discount_price: number
  net_price: number
  total_price: number
  total_discount_price: number
  total_net_price: number
  order_id: string
}

