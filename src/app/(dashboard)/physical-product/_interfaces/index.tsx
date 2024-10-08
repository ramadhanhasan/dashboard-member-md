import { IReferralLink } from "../../links/_interfaces"

export interface IProduct {
  id?: string
  created_at?: Date
  slug: string
  name: string
  sku: string
  position: number
  short_description: string
  description: string
  assets: {url: string}[]
  is_active: boolean
  stock_type: string
  stock: number
  price: number
  base_price: number
  net_price: number
  referral_links?: IReferralLink[]
}
