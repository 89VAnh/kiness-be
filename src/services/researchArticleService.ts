import { injectable } from "tsyringe";
import {
  ResearchArticle,
  ResearchArticleSearchParams,
} from "../models/research-article";
import { ResearchArticleRepository } from "../repositories/researchArticleRespository";

@injectable()
export class ResearchArticleService {
  constructor(private researchArticleRepository: ResearchArticleRepository) {}

  async getResearchArticleById(id: number): Promise<any> {
    return this.researchArticleRepository.getResearchArticle(id);
  }

  async createResearchArticle(researchArticle: ResearchArticle): Promise<any> {
    return this.researchArticleRepository.createResearchArticle(
      researchArticle,
    );
  }

  async updateResearchArticle(researchArticle: ResearchArticle): Promise<any> {
    return this.researchArticleRepository.updateResearchArticle(
      researchArticle,
    );
  }

  async deleteResearchArticle(
    list_json: any,
    lu_user_id: string,
  ): Promise<any> {
    return this.researchArticleRepository.deleteResearchArticle(
      list_json,
      lu_user_id,
    );
  }
  async searchResearchArticle(
    search_param: ResearchArticleSearchParams,
  ): Promise<ResearchArticle> {
    return this.researchArticleRepository.searchResearchArticle(search_param);
  }
}
