import { BaseModel } from "./base";

export interface Slide extends BaseModel {
    slide_id: string,
    slide_caption: string,
    image: string,
    order: number,
}