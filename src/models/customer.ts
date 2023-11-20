import { BaseModel } from "./base";

export interface Customer extends BaseModel {
  customer_id: string;
  customer_name: string;
  branch_id: number;
  phone_number: string;
  birthday: string;
  gender: number;
  email: string;
  address: string;
  verify: number;

  // system user
  password: string;
  user_id: string;
  user_name: string;
  type: string;
  description: string;
  online_flag: boolean;
  is_guest: boolean;
  // user profile
  profile_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  avatar: string;
  date_of_birth: string;

  // user_roles
  user_role_id: string;
  role_id: string;
}
