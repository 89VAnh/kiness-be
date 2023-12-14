import { BaseModel } from "./base";

export interface ObesityStoryModel extends BaseModel {
  obesity_story_id: number;
  title: string;
  content: string;
  image_link: string;
  posted_date: Date;
  author_name: string;
  view_count: number;
  is_draft: boolean;
}

export interface SearchObesityStoryModel {
  pageIndex: number;
  pageSize: number;
  search_content: string;
  is_draft: boolean;
}

export interface SearchClientObesityStoryModel {
  pageIndex: number;
  pageSize: number;
  search_content: string;
}
