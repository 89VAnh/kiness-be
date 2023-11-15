import { BaseModel } from "./base";

export interface ExperienceRegister extends BaseModel {
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
  created_date_time: Date;
}

export interface SearchExperienceRegister {
  pageIndex: number;
  pageSize: number;
  user_id: string;
  search_content: string;
  branch_name: string;
  phone: string;
  address: string;
  from_date: Date;
  to_date: Date;
}
