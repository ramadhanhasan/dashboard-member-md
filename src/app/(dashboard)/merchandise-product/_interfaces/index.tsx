import { IReferralLink } from "../../links/_interfaces"

export interface IMembershipProduct {
  id?: string
  created_at?: Date
  slug: string
  name: string
  sku: string
  position: number
  description: string
  image_url: string
  is_active: boolean
  stock_type: string
  stock: number
  expired_time: number
  price: number
  net_price: number
  membership_plan?: IMembershipPlan
  referral_links?: IReferralLink[]
}

export interface IMembershipPlan {
  id: string
  name: string
  commission: number
}
