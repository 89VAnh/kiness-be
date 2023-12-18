import { BaseModel } from "./base";

export interface LicenseOfInventionModel extends BaseModel {
  license_id: number;
  title: string;
  license_no: string;
  image_url?: string;
  description?: string;
}

export interface SearchLicenseOfInventionModel {
  page_index: number;
  page_size: number;
  search_content: string;
}
