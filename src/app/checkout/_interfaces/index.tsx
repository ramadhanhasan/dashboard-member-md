  export interface IOrder {
    order_number?: string
    total_quantity: number
    expired_at?: Date
    total_price: number
    total_discount_price: number
    total_net_price: number
    user_name: string
    user_email: string
    user_phone: string
    type: string
    sub_type: string
    referral_from?: string
    funnel?: string
    referral_from_id?: string
    commission_amount_referral?: number
    order_details?: OrderDetail[]
    items?: OrderDetail[]
    payment_method_id?: string
    payment_method_name?: string
    payment_service_id?: string
    payment_service_name?: string
    payment_account_number?: string
    payment_account_name?: string
    user_id?: string
    id?: string
    created_at?: Date
    updated_at?: Date
    status?: string
  }
  
  export interface OrderDetail {
    other_id?: string
    event_id?: string
    membership_id?: string
    product_id?: string
    item_name: string
    weight: number
    type: string
    quantity: number
    base_price: number
    price: number
    discount_price: number
    net_price: number
    total_price: number
    total_discount_price: number
    total_net_price: number
    order_id?: string
    item_sku?: string
    image_url?: string
    discount_type?: string
    id?: string
    created_at?: Date
    updated_at?: Date
    description?: string
    discount?: number
  }
  
  