import { BaseModel } from "./base";

export interface BookAuthorModel extends BaseModel {
  author_id: number;
  author_name: string;
}

export interface SearchBookAuthorModel {
  pageIndex: number;
  pageSize: number;
  search_content: string;
}
