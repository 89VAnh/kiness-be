import { BaseModel } from "./base";

export interface RequestModel extends BaseModel {
  request_id: string;
  subject: string;
  content: string;
  is_accepted: boolean;
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
  pageIndex: number;
  pageSize: number;
  search_content: string;
  is_accepted: boolean;
  is_answered: boolean;
}

export interface SearchClientRequestModel {
  pageIndex: number;
  pageSize: number;
  search_content: string;
}
