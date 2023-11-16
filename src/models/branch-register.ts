import { BaseModel } from "./base";

export interface BranchRegister extends BaseModel {
  register_id: number;
  city_id: number;
  branch_name: string;
  phone_number: string;
  address: string;
  email: string;
  status: number;
}

export interface SearchBranchRegister {
  pageIndex: number;
  pageSize: number;
  user_id: string;
  search_conent: string;
  branch_name: string;
  phone: string;
  address: string;
  email: string;
  city_name: string;
  status: number;
  from_date: Date;
  to_date: Date;
}
