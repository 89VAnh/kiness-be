import { injectable } from "tsyringe";
import { BookModel, SearchBookModel } from "../models/book";
import { BookRepository } from "../repositories/bookRepository";

@injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async createBook(book: BookModel): Promise<any> {
    return await this.bookRepository.createBook(book);
  }

  async updateBook(book: BookModel): Promise<any> {
    return await this.bookRepository.updateBook(book);
  }

  async deleteBook(author_id: number, lu_userauthor_id: string): Promise<any> {
    return await this.bookRepository.deleteBook(author_id, lu_userauthor_id);
  }

  async getDetailBook(author_id: number): Promise<any> {
    return await this.bookRepository.getDetailBook(author_id);
  }

  async searchBooks(book_search: SearchBookModel): Promise<any> {
    return await this.bookRepository.searchBooks(book_search);
  }
}
