import { BaseModel } from "./base";

export interface Video extends BaseModel {
    video_id: number;
    video_name: string;
    video_link: string;
    is_foreign: boolean;
}

export interface SearchVideoModel {
    pageIndex: number;
    pageSize: number;
    search_content: string;
    is_foreign: boolean;
}