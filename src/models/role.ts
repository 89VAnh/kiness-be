import { BaseModel } from "./base";

export interface Role extends BaseModel {
  role_id: number;
  role_name: string;
  role_code: string;
  description: string;
}

export interface SearchRole {
  page_index: number;
  page_size: number;
  search_content: string;
  role_name: string;
  role_code: string;
  description: string;
}
