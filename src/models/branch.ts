import { BaseModel } from "./base";

export interface Branch extends BaseModel {
  branch_id: number;
  city_id: string;
  branch_name: string;
  phone: string;
  fax: string;
  address: string;
}
