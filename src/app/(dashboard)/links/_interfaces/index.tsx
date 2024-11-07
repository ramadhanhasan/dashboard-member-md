import { IEvent } from "../../event/_interfaces"
import { IMembershipProduct } from "../../membership-product/_interfaces"
import { IProduct } from "../../physical-product/_interfaces"

export interface IReferralLink {
  id?: string
  created_at?: Date
  name: string
  type: string
  url: string
  utm_pixel?: string
  is_active: boolean
  code: number
  is_whatsapp_link: boolean
  product?: IProduct
  product_id?: string | null
  event?: IEvent
  event_id?: string | null
  membership?: IMembershipProduct
  membership_id?: string | null
  position: number
  referral_link_attributes?: IReferralLinkAttribute[] 
}

export interface IReferralLinkAttribute {
  referral_link_id?: string
  id?: string
  utm_pixel?: string
  utm_pixel_button_chat?: string
  utm_pixel_button_checkout?: string
}

