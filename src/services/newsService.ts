import { injectable } from "tsyringe";
import { News } from "../models/news";
import { NewsRepository } from "../repositories/newsRepository";

@injectable()
export class NewsService {
  constructor(private newsRepository: NewsRepository) {}

  async getNewsById(id: string): Promise<any> {
    return this.newsRepository.getNewsById(id);
  }

  async createNews(news: News): Promise<any> {
    return this.newsRepository.createNews(news);
  }

  async updateNews(news: News): Promise<any> {
    return this.newsRepository.updateNews(news);
  }

  async deleteNews(list_json: any, lu_user_id: string): Promise<any> {
    return this.newsRepository.deleteNews(list_json, lu_user_id);
  }

  async searchNews(
    page_index: number,
    page_size: number,
    search_content: string,
    news_title: string,
    content: string,
  ): Promise<News> {
    return this.newsRepository.searchNews(
      page_index,
      page_size,
      search_content,
      news_title,
      content,
    );
  }
}
