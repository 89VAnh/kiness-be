import { BaseModel } from "./base";

export interface City extends BaseModel {
  city_id: number;
  city_name: string;
  code: string;
}

export interface SearchCity {
  page_index: number;
  page_size: number;
  search_content: string;
  city_name: string;
  code: string;
}
