import { injectable } from "tsyringe";
import {
  ArticleAuthor,
  ArticleAuthorSearchParams,
} from "../models/article-author";
import { ArticleAuthorRepository } from "../repositories/articleAuthorRepository";

@injectable()
export class ArticleAuthorService {
  constructor(private articleAuthorRepository: ArticleAuthorRepository) {}

  async getArticleAuthorById(id: number): Promise<any> {
    return this.articleAuthorRepository.getArticleAuthor(id);
  }

  async createArticleAuthor(articleAuthor: ArticleAuthor): Promise<any> {
    return this.articleAuthorRepository.createArticleAuthor(articleAuthor);
  }

  async updateArticleAuthor(articleAuthor: ArticleAuthor): Promise<any> {
    return this.articleAuthorRepository.updateArticleAuthor(articleAuthor);
  }

  async deleteArticleAuthor(list_json: any, lu_user_id: string): Promise<any> {
    return this.articleAuthorRepository.deleteArticleAuthor(
      list_json,
      lu_user_id,
    );
  }
  async searchArticleAuthor(
    search_param: ArticleAuthorSearchParams,
  ): Promise<ArticleAuthor> {
    return this.articleAuthorRepository.searchArticleAuthor(search_param);
  }

  async getArticleAuthorDropdown() {
    return await this.articleAuthorRepository.getArticleAuthorDropdown();
  }
}
