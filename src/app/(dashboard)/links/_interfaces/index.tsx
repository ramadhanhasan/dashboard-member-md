import { IEvent } from "../../event/_interfaces"

export interface IReferralLink {
  id?: string
  created_at?: Date
  name: string
  type: string
  url: string
  is_active: boolean
  code: number
  is_whatsapp_link: boolean
  // product?: IProduct
  product_id?: string | null
  event?: IEvent
  event_id?: string | null
  // membership?: IMembership
  membership_id?: string | null
  position: number
}
