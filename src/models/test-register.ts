import { BaseModel } from "./base";

export interface TestRegister extends BaseModel {
  branch_id: number;
  fullname: string;
  gender: number;
  level: string;
  date: string;
  phone_number: string;
  address: string;
  detail: string;
}
