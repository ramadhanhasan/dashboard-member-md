export interface IEvent {
  created_at: Date
  slug: string
  name: string
  description: string
  implementation: string
  location: string
  location_detail: string
  image_url: string
  link?: string
  button_text?: string
  quota_type: string
  quota: number
  start_date: Date
  end_date: Date
  price: number
  net_price: number
  is_finished: boolean
}
