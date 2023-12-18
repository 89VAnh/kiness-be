import { BaseModel } from "./base";

export interface FAQTopic extends BaseModel {
  topic_id: number;
  topic_name: string;
}

export interface SearchFAQTopicsModel {
  page_index: number;
  page_size: number;
  search_content?: string;
  topic_id?: number;
}
