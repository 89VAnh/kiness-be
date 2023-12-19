import { BaseModel } from "./base";

export interface HistoryModel extends BaseModel {
  history_id: number;
  year: number;
  content: string;
  sort_order: number;
}

export interface SearchHistoryModel {
  page_index: number;
  page_size: number;
  search_content: string;
}
