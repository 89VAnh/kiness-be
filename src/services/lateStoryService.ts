import { injectable } from "tsyringe";
import { LateStoryRepository } from "../repositories/lateStoryRepository";
import {
  LateStoryModel,
  SearchClientLateStoryModel,
  SearchLateStoryModel,
} from "../models/late-story";

@injectable()
export class LateStoryService {
  constructor(private lateStoryRepository: LateStoryRepository) {}

  async createLateStory(ls: LateStoryModel): Promise<any> {
    await this.lateStoryRepository.createLateStory(ls);
  }

  async updateLateStory(ls: LateStoryModel): Promise<any> {
    await this.lateStoryRepository.updateLateStory(ls);
  }

  async updateViewCountLateStory(late_story_id: number): Promise<any> {
    await this.lateStoryRepository.updateViewCountLateStory(late_story_id);
  }

  async deleteLateStory(late_story_id: number): Promise<any> {
    await this.lateStoryRepository.deleteLateStory(late_story_id);
  }

  async getDetailLateStory(late_story_id: number): Promise<any> {
    return await this.lateStoryRepository.getDetailLateStory(late_story_id);
  }

  async getDetailClientLateStory(late_story_id: number): Promise<any> {
    return await this.lateStoryRepository.getDetailClientLateStory(
      late_story_id,
    );
  }

  async searchLateStories(search_ls_model: SearchLateStoryModel): Promise<any> {
    return await this.lateStoryRepository.searchLateStories(search_ls_model);
  }

  async searchClientLateStories(
    search_client_ls: SearchClientLateStoryModel,
  ): Promise<any> {
    return await this.lateStoryRepository.searchClientLateStories(
      search_client_ls,
    );
  }
}
