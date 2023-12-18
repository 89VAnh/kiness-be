import { BaseModel } from "./base";

export interface BookAuthorModel extends BaseModel {
  author_id: number;
  author_name: string;
}

export interface SearchBookAuthorModel {
  page_index: number;
  page_size: number;
  search_content: string;
}
