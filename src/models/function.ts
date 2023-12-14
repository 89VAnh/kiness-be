import { BaseModel } from "./base";

export interface FunctionModel extends BaseModel {
    function_id: string;
    parent_id: string;
    function_name: string;
    url: string;
    description: string;
    sort_order: number;
    level: number;
    css_class: string;
}