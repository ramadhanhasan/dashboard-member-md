import { IHistoryCommission } from "../../commission/_interfaces";

export interface IUser {
  created_at?: Date;
  updated_at?: Date;
  name: string;
  id: string;
  username?: string;
  email?: string;
  phone: string;
  avatar?: string;
  birth_date?: string;
  select_birth_date?: Date;
  is_active?: boolean;
  is_verified?: boolean;
  is_expired?: boolean;
  address: string;
  postal_code: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  province_id: string;
  city_id: string;
  subdistrict_id: string;
  referral_from_user?: IUser;
  refferral_code?: string;
  expired_time?: Date;
  balance?: number;
  total_commission?: number;
  total_withdrawal?: number;
  history_commission?: IHistoryCommission[]
}

export interface IChangePassword {
  password: string;
  confirmPassword: string;
  old_password: string;
}