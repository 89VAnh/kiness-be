import { BaseModel } from "./base";

export interface PostureStoryModel extends BaseModel {
  posture_story_id: number;
  title: string;
  content: string;
  image_link: string;
  posted_date: Date;
  author_name: string;
  view_count: number;
  is_draft: boolean;
}

export interface SearchPostureStoryModel {
  page_index: number;
  page_size: number;
  search_content: string;
  is_draft: boolean;
  from_date: Date;
  to_date: Date;
}

export interface SearchClientPostureStoryModel {
  page_index: number;
  page_size: number;
  search_content: string;
  from_date: Date;
  to_date: Date;
}
