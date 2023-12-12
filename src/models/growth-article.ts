import { BaseModel } from "./base";

export interface GrowthArticleModel extends BaseModel {
    growth_article_id: number;
    title: string;
    content: string;
    image_link: string;
    posted_date: Date;
    author_name: string;
    view_count: number;
    is_draft: boolean;
}

export interface SearchGrowthArticleModel {
    pageIndex: number;
    pageSize: number;
    search_content: string;
    is_draft: boolean;
}

export interface SearchClientGrowthArticleModel {
    pageIndex: number;
    pageSize: number;
    search_content: string;
}