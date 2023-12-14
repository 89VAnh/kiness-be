import { injectable } from "tsyringe";
import { BookAuthorModel, SearchBookAuthorModel } from "../models/book-author";
import { BookAuthorRepository } from "../repositories/bookAuthorRepository";

@injectable()
export class BookAuthorService {
  constructor(private bookAuthorRepository: BookAuthorRepository) {}

  async createBookAuthor(bookAuthor: BookAuthorModel): Promise<any> {
    return await this.bookAuthorRepository.createBookAuthor(bookAuthor);
  }

  async updateBookAuthor(bookAuthor: BookAuthorModel): Promise<any> {
    return await this.bookAuthorRepository.updateBookAuthor(bookAuthor);
  }

  async deleteBookAuthor(author_id: number, lu_user_id: string): Promise<any> {
    return await this.bookAuthorRepository.deleteBookAuthor(
      author_id,
      lu_user_id,
    );
  }

  async getDetailBookAuthor(author_id: number): Promise<any> {
    return await this.bookAuthorRepository.getDetailBookAuthor(author_id);
  }

  async searchBookAuthors(
    bookAuthor_search: SearchBookAuthorModel,
  ): Promise<any> {
    return await this.bookAuthorRepository.searchBookAuthors(bookAuthor_search);
  }

  async getBookAuthorDropDown(): Promise<any> {
    return await this.bookAuthorRepository.getBookAuthorDropdown();
  }
}
