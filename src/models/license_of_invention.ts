import { BaseModel } from "./base";

export interface LicenseOfInventionModel extends BaseModel {
  license_id: number;
  title: string;
  license_no: string;
  image_url?: string;
  description?: string;
}

export interface SearchLicenseOfInventionModel {
  pageIndex: number;
  pageSize: number;
  search_content: string;
}
