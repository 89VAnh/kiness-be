import { injectable } from "tsyringe";
import { VideoRepository } from "../repositories/videoRepository";
import { SearchVideoModel, Video } from "../models/video";

@injectable()
export class VideoService {
  constructor(private videoRepository: VideoRepository) {}

  async createVideo(video: Video): Promise<any> {
    await this.videoRepository.createVideo(video);
  }

  async updateVideo(video: Video): Promise<any> {
    await this.videoRepository.updateVideo(video);
  }

  async getDetailVideo(video_id: number): Promise<any> {
    return await this.videoRepository.getDetailVideo(video_id);
  }

  async deleteVideo(video_id: number): Promise<any> {
    await this.videoRepository.deleteVideo(video_id);
  }

  async searchVideos(object: SearchVideoModel): Promise<any> {
    return await this.videoRepository.searchVideos(object);
  }
}
