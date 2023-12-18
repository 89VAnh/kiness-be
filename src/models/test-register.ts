import { BaseModel } from "./base";

export interface TestRegister extends BaseModel {
  register_id: number;
  branch_id: number;
  fullname: string;
  gender: number;
  level: string;
  date: Date;
  phone_number: string;
  address: string;
  detail: string;
  status: number;
}

export interface SearchTestRegister {
  page_index: number;
  page_size: number;
  user_id: string;
  search_content: string;
  branch_name: string;
  phone: string;
  address: string;
  status: number;
  from_date: Date;
  to_date: Date;
}
