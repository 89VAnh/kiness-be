import { BaseModel } from "./base";

export interface ArticleAuthor extends BaseModel {
  author_id: number;
  name: string;
  link?: string;
}

export interface ArticleAuthorSearchParams {
  page_index: number;
  page_size: number;
  search_content: string;
}
