import { injectable } from "tsyringe";
import { NewsRepository } from "../repositories/newsRepository";
import { News } from "../models/news";

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

  async deleteNews(list_json: any, updated_by_id: string): Promise<any> {
    return this.newsRepository.deleteNews(list_json, updated_by_id);
  }
  
  async searchNews(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    news_title: string,
    content: string,
  ): Promise<News> {
    return this.newsRepository.searchNews(
      pageIndex,
      pageSize,
      search_content,
      news_title,
      content,
    );
  }
}
