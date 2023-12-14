import { BaseModel } from "./base";

export interface Page extends BaseModel {
  page_id: string;
  page_code: string;
  page_title: string;
  content: string;
}
