import { BaseModel } from "./base";

export interface City extends BaseModel {
  city_id: number;
  city_name: string;
  code: string;
}

export interface SearchCity {
  pageIndex: number;
  pageSize: number;
  search_content: string;
  city_name: string;
  code: string;
}
