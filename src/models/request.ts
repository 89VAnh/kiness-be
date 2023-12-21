import { BaseModel } from "./base";

export interface RequestModel extends BaseModel {
  request_id: string;
  subject: string;
  content: string;
  is_accepted?: boolean;
  is_answered: boolean;
  answer: string;
  author_name: string;
  password: string;
  email: string;
  phone_number: string;
}

export interface GetClientReadRequestModel {
  request_id: number;
  password: string;
}

export interface SearchRequestModel {
  page_index: number;
  page_size: number;
  search_content: string;
  is_accepted: boolean;
  is_answered: boolean;
}

export interface SearchClientRequestModel {
  page_index: number;
  page_size: number;
  search_content: string;
}
