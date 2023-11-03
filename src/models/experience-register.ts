import { BaseModel } from "./base";

export interface ExperienceRegister extends BaseModel {
  register_id: number;
  branch_id: number;
  fullname: string;
  gender: number;
  level: string;
  date: string;
  phone_number: string;
  address: string;
  detail: string;
  status: number;
  created_date_time: Date;
}
