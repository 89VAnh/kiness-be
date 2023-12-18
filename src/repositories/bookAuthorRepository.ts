import { injectable } from "tsyringe";
import { Database } from "../config/database";

import { BookAuthorModel, SearchBookAuthorModel } from "../models/book-author";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class BookAuthorRepository {
  constructor(private db: Database) {}

  async createBookAuthor(ba: BookAuthorModel): Promise<any> {
    try {
      const sql = "CALL InsertBookAuthor(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [ba.author_name, ba.created_by_user_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async updateBookAuthor(ba: BookAuthorModel): Promise<any> {
    try {
      const sql = "CALL UpdateBookAuthor(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [ba.author_id, ba.author_name, ba.lu_user_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async deleteBookAuthor(author_id: number, lu_user_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteBookAuthor(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [author_id, lu_user_id]);
      return true;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getDetailBookAuthor(author_id: number): Promise<any> {
    try {
      const sql = "CALL GetDetailBookAuthor(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [author_id]);
      return results[0];
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async searchBookAuthors(
    search_ba_model: SearchBookAuthorModel,
  ): Promise<any> {
    try {
      const sql = "CALL SearchBookAuthors(?, ?, ?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        search_ba_model.page_index,
        search_ba_model.page_size,
        search_ba_model.search_content,
      ]);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }

  async getBookAuthorDropdown(): Promise<any> {
    try {
      const sql = "CALL GetBookAuthorDropdown(@err_code, @err_msg)";
      var [results] = await this.db.query(sql, []);
      return results;
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}
