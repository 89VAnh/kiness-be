import { BaseModel } from "./base";

export interface FAQTopic extends BaseModel {
  topic_id: number;
  topic_name: string;
}

export interface SearchFAQTopicsModel {
  pageIndex: number;
  pageSize: number;
  search_content?: string;
  topic_id?: number;
}
