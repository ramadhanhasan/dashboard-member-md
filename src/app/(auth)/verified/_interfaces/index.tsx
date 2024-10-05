export interface IUserVerified {
  id: string;
  activation_code: string;
  email: string;
  name: string;
  phone: string;
  birth_date?: string;
  select_birth_date?: Date;
  password: string;
  confirmPassword?: string; // for verified user
  province_id: string;
  city_id: string;
  subdistrict_id: string;
  address: string;
  postal_code: string;
  account_name: string;
  account_number: string;
  bank_name: string;
  work: string;
  have_studied: string;
  information_from: string;
  why_join: string;
}
