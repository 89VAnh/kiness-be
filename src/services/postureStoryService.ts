import { injectable } from "tsyringe";
import { PostureStoryRepository } from "../repositories/postureStoryRepository";
import { PostureStoryModel, SearchClientPostureStoryModel, SearchPostureStoryModel } from "../models/posture-story";

@injectable()
export class PostureStoryService {
    constructor(private postureStoryRepository: PostureStoryRepository) {}

    async createPostureStory(ps: PostureStoryModel): Promise<any> {
        await this.postureStoryRepository.createPostureStory(ps);
    }

    async updatePostureStory(ps: PostureStoryModel): Promise<any> {
        await this.postureStoryRepository.updatePostureStory(ps);
    }

    async updateViewCountPostureStory(posture_story_id: number): Promise<any> {
        await this.postureStoryRepository.updateViewCountPostureStory(posture_story_id);
    }

    async deletePostureStory(posture_story_id: number): Promise<any> {
        await this.postureStoryRepository.deletePostureStory(posture_story_id);
    }

    async getDetailPostureStory(posture_story_id: number): Promise<any> {
        return await this.postureStoryRepository.getDetailPostureStory(posture_story_id);
    }

    async getDetailClientPostureStory(posture_story_id: number): Promise<any> {
        return await this.postureStoryRepository.getDetailClientPostureStory(posture_story_id);
    }

    async searchPostureStories(search_ps_model: SearchPostureStoryModel): Promise<any> {
        return await this.postureStoryRepository.searchPostureStories(search_ps_model);
    }

    async searchClientPostureStories(search_client_ps: SearchClientPostureStoryModel): Promise<any> {
        return await this.postureStoryRepository.searchClientPostureStories(search_client_ps);
    }

}