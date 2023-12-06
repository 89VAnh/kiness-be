import { BaseModel } from "./base";

export interface Researcher extends BaseModel {
  researcher_id: number;
  name: string;
  position?: string;
  image_url?: string;
  story?: string;
  paper?: string;
  degree?: string;
}
