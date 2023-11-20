import { BaseModel } from "./base";

export interface Position extends BaseModel {
  position_id: number;
  position_name: string;
  description: string;
}
