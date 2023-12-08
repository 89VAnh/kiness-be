import { BaseModel } from "./base";

export interface FAQ extends BaseModel{
    faq_id: number;
    question: string;
    answer: string;
    topic_id: number;
};

export interface SearchFAQModel {
    pageIndex: number;
    pageSize: number;
    search_content: string;
    topic_id: number;
}