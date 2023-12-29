import { BaseModel } from "./base";

export interface DiagramModel extends BaseModel {
  node_id: string;
  parent_id: string;
  node_name: string;
  color: string;
  sort_order: number;
  level: number;
}

export interface SearchNodesModel {
  page_index: number;
  page_size: number;
  search_content: string;
  node_id: string;
  parent_id: string;
  node_name: string;
  color: string;
  sort_order: number;
  level: number;
}
