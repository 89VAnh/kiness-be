import { BaseModel } from "./base";

export interface News extends BaseModel {
  news_id: number;
  news_title: string;
  content: string;
  content_html: string;
  thumbnail: string;
  views: number;
  lu_user_id: string;
}
