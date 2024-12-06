import { IMembershipProduct } from "../../membership-product/_interfaces"

export interface IEvent {
  id: string
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
  consumer_price: number
  consumer_net_price: number
  event_attendances?: IEventAttendance[]
  free_membership_id?: string
  free_membership?: IMembershipProduct
}

export interface IEventAttendance {
  entry_code: string
}
