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
