import { BaseModel } from "./base";

export interface LateStoryModel extends BaseModel {
  late_story_id: number;
  title: string;
  content: string;
  image_link: string;
  posted_date: Date;
  author_name: string;
  view_count: number;
  is_draft: boolean;
}

export interface SearchLateStoryModel {
  page_index: number;
  page_size: number;
  search_content: string;
  is_draft: boolean;
}

export interface SearchClientLateStoryModel {
  page_index: number;
  page_size: number;
  search_content: string;
}
