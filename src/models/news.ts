import { BaseModel } from "./base";

export interface News extends BaseModel {
  news_id: number;
  news_title: string;
  content: string;
  content_html: string;
  views: number;
}
