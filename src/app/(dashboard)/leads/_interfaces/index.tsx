export interface IUserLead {
  id: string
  created_at: Date
  updated_at: Date
  name: string
  email: string
  is_member: boolean
  is_expired: boolean
  phone: string
  funnel: string
  referral_from: string
}
