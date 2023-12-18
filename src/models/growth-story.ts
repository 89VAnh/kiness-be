import { BaseModel } from "./base";

export interface GrowthStoryModel extends BaseModel {
  growth_story_id: number;
  title: string;
  content: string;
  image_link: string;
  posted_date: Date;
  author_name: string;
  view_count: number;
  is_draft: boolean;
}

export interface SearchGrowthStoryModel {
  page_index: number;
  page_size: number;
  search_content: string;
  is_draft: boolean;
}

export interface SearchClientGrowthStoryModel {
  page_index: number;
  page_size: number;
  search_content: string;
}
