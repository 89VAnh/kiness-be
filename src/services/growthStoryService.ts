import { injectable } from "tsyringe";
import { GrowthStoryRepository } from "../repositories/growthStoryRepository";
import {
  GrowthStoryModel,
  SearchClientGrowthStoryModel,
  SearchGrowthStoryModel,
} from "../models/growth-story";

@injectable()
export class GrowthStoryService {
  constructor(private growthStoryRepository: GrowthStoryRepository) {}

  async createGrowthStory(gs: GrowthStoryModel): Promise<any> {
    await this.growthStoryRepository.createGrowthStory(gs);
  }

  async updateGrowthStory(gs: GrowthStoryModel): Promise<any> {
    await this.growthStoryRepository.updateGrowthStory(gs);
  }

  async updateViewCountGrowthStory(growth_story_id: number): Promise<any> {
    await this.growthStoryRepository.updateViewCountGrowthStory(
      growth_story_id,
    );
  }

  async deleteGrowthStory(growth_story_id: number): Promise<any> {
    await this.growthStoryRepository.deleteGrowthStory(growth_story_id);
  }

  async getDetailGrowthStory(growth_story_id: number): Promise<any> {
    return await this.growthStoryRepository.getDetailGrowthStory(
      growth_story_id,
    );
  }

  async getDetailClientGrowthStory(growth_story_id: number): Promise<any> {
    return await this.growthStoryRepository.getDetailClientGrowthStory(
      growth_story_id,
    );
  }

  async searchGrowthStories(
    search_gs_model: SearchGrowthStoryModel,
  ): Promise<any> {
    return await this.growthStoryRepository.searchGrowthStories(
      search_gs_model,
    );
  }

  async searchClientGrowthStories(
    search_client_gs: SearchClientGrowthStoryModel,
  ): Promise<any> {
    return await this.growthStoryRepository.searchClientGrowthStories(
      search_client_gs,
    );
  }
}
