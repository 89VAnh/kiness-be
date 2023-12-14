import { injectable } from "tsyringe";
import { Database } from "../config/database";

import { BookModel, SearchBookModel } from "../models/book";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class BookRepository {
  constructor(private db: Database) {}

  async createBook(b: BookModel): Promise<any> {
    try {
      const sql = "CALL InsertBook(?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        b.title,
        b.image_url,
        b.author_id,
        b.publication_date,
        b.created_by_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateBook(b: BookModel): Promise<any> {
    try {
      const sql = "CALL UpdateBook(?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [
        b.book_id,
        b.title,
        b.image_url,
        b.author_id,
        b.publication_date,
        b.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteBook(book_id: number, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteBook(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [book_id, lu_user_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailBook(book_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailBook(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [book_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchBooks(search_b_model: SearchBookModel): Promise<any> {
    try {
      const sql = "CALL SearchBooks(?, ?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_b_model.pageIndex,
        search_b_model.pageSize,
        search_b_model.search_content,
        search_b_model.author_id,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
