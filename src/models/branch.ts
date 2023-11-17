import { BaseModel } from "./base";

export interface Branch extends BaseModel {
  branch_id: number;
  city_id: string;
  branch_name: string;
  phone: string;
  fax: string;
  address: string;
  thumbnail: string;
}

export interface SearchBranch {
  pageIndex: number;
  pageSize: number;
  search_content: string;
  branch_name: string;
  phone: string;
  fax: string;
  address: string;
}
