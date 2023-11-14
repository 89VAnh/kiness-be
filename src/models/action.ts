import { BaseModel } from "./base";

export interface Action extends BaseModel {
    action_code: string,
    function_id: string,
    action_name: string,
    description: string,
}