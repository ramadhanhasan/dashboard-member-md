export interface IHistoryCommission {
  id: string
  created_at: Date
  updated_at: Date
  user_id: string
  order_id: string
  commission_action: string
  previous_balance: number
  adjustment: number
  final_balance: number
  notes: string
}