import { BaseModel } from "./base";

export interface ResearchArticle extends BaseModel {
  article_id: number;
  title: string;
  article_link?: string;
  content?: string;
  issuers?: string;
  year_of_release?: number;
  list_json_author_id?: string;
}

export interface ResearchArticleSearchParams {
  page_index: number;
  page_size: number;
  search_content: string;
}
