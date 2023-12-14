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
  pageIndex: number;
  pageSize: number;
  search_content: string;
  is_draft: boolean;
}

export interface SearchClientGrowthStoryModel {
  pageIndex: number;
  pageSize: number;
  search_content: string;
}
