import { BaseModel } from "./base";

export interface BookModel extends BaseModel {
  book_id: number;
  title: string;
  image_url?: string;
  author_id?: number;
  publication_date?: Date;
}

export interface SearchBookModel {
  pageIndex: number;
  pageSize: number;
  search_content: string;
  author_id: number;
}
