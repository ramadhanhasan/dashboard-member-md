export interface IEvent {
  created_at: Date
  slug: string
  name: string
  description: string
  image_url: string
  link_lp: string
  quota_type: string
  quota: number
  start_date: Date
  end_date: Date
  price: number
  net_price: number
}
