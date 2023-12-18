import { BaseModel } from "./base";

export interface FAQ extends BaseModel {
  faq_id: number;
  question: string;
  answer: string;
  topic_id: number;
}

export interface SearchFAQModel {
  page_index: number;
  page_size: number;
  search_content: string;
  topic_id: number;
}
