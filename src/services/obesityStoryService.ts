import { injectable } from "tsyringe";
import { ObesityStoryRepository } from "../repositories/obesityStoryRepository";
import {
  ObesityStoryModel,
  SearchClientObesityStoryModel,
  SearchObesityStoryModel,
} from "../models/obesity-story";

@injectable()
export class ObesityStoryService {
  constructor(private obesityStoryRepository: ObesityStoryRepository) {}

  async createObesityStory(os: ObesityStoryModel): Promise<any> {
    await this.obesityStoryRepository.createObesityStory(os);
  }

  async updateObesityStory(os: ObesityStoryModel): Promise<any> {
    await this.obesityStoryRepository.updateObesityStory(os);
  }

  async updateViewCountObesityStory(obesity_story_id: number): Promise<any> {
    await this.obesityStoryRepository.updateViewCountObesityStory(
      obesity_story_id,
    );
  }

  async deleteObesityStory(obesity_story_id: number): Promise<any> {
    await this.obesityStoryRepository.deleteObesityStory(obesity_story_id);
  }

  async getDetailObesityStory(obesity_story_id: number): Promise<any> {
    return await this.obesityStoryRepository.getDetailObesityStory(
      obesity_story_id,
    );
  }

  async getDetailClientObesityStory(obesity_story_id: number): Promise<any> {
    return await this.obesityStoryRepository.getDetailClientObesityStory(
      obesity_story_id,
    );
  }

  async searchObesityStories(
    search_os_model: SearchObesityStoryModel,
  ): Promise<any> {
    return await this.obesityStoryRepository.searchObesityStories(
      search_os_model,
    );
  }

  async searchClientObesityStories(
    search_client_os: SearchClientObesityStoryModel,
  ): Promise<any> {
    return await this.obesityStoryRepository.searchClientObesityStories(
      search_client_os,
    );
  }
}
