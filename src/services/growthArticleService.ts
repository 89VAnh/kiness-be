import { injectable } from "tsyringe";
import { GrowthArticleRepository } from "../repositories/growthArticleRepository";
import {
  GrowthArticleModel,
  SearchClientGrowthArticleModel,
  SearchGrowthArticleModel,
} from "../models/growth-article";

@injectable()
export class GrowthArticleService {
  constructor(private growthArticleRepository: GrowthArticleRepository) {}

  async createGrowthArticle(ga: GrowthArticleModel): Promise<any> {
    await this.growthArticleRepository.createGrowthArticle(ga);
  }

  async updateGrowthArticle(ga: GrowthArticleModel): Promise<any> {
    await this.growthArticleRepository.updateGrowthArticle(ga);
  }

  async updateViewCountGrowthArticle(growth_article_id: number): Promise<any> {
    await this.growthArticleRepository.updateViewCountGrowthArticle(
      growth_article_id,
    );
  }

  async deleteGrowthArticle(growth_article_id: number): Promise<any> {
    await this.growthArticleRepository.deleteGrowthArticle(growth_article_id);
  }

  async getDetailGrowthArticle(growth_article_id: number): Promise<any> {
    return await this.growthArticleRepository.getDetailGrowthArticle(
      growth_article_id,
    );
  }

  async getDetailClientGrowthArticle(growth_article_id: number): Promise<any> {
    return await this.growthArticleRepository.getDetailClientGrowthArticle(
      growth_article_id,
    );
  }

  async searchGrowthArticles(
    search_ga_model: SearchGrowthArticleModel,
  ): Promise<any> {
    return await this.growthArticleRepository.searchGrowthArticles(
      search_ga_model,
    );
  }

  async searchClientGrowthArticles(
    search_client_ga: SearchClientGrowthArticleModel,
  ): Promise<any> {
    return await this.growthArticleRepository.searchClientGrowthArticles(
      search_client_ga,
    );
  }
}
