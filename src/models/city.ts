import { BaseModel } from "./base";

  export interface City extends BaseModel {
    city_id: number;
    city_name: string;
    code: string;
  }