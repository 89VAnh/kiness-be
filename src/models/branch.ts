import { BaseModel } from "./base";

export interface Branch extends BaseModel {
  branch_id: number;
  city_id: string;
  branch_name: string;
  phone: string;
  fax: string;
  address: string;
  thumbnail: string;
  open_time: string;
  close_time: string;
  embed_map: string;
}

export interface SearchBranch {
  page_index: number;
  page_size: number;
  city_id: number;
  search_content: string;
  branch_name: string;
  phone: string;
  fax: string;
  address: string;
  thumbnail: string;
  open_time: string;
  close_time: string;
  embed_map: string;
}
