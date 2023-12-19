import { injectable } from "tsyringe";
import { Slide } from "../models/slide";
import { SlideRepository } from "../repositories/slideRepository";

@injectable()
export class SlideService {
  constructor(private slideRepository: SlideRepository) {}

  async getSlideDropdown(): Promise<any> {
    return this.slideRepository.getSlideDropdown();
  }

  async getSlideById(id: string): Promise<any> {
    return this.slideRepository.getSlideById(id);
  }

  async createSlide(slide: Slide): Promise<any> {
    return this.slideRepository.createSlide(slide);
  }

  async updateSlide(slide: Slide): Promise<any> {
    return this.slideRepository.updateSlide(slide);
  }

  async deleteSlide(list_json: any, lu_user_id: string): Promise<any> {
    return this.slideRepository.deleteSlide(list_json, lu_user_id);
  }
  async searchSlide(
    slideIndex: number,
    slideSize: number,
    search_content: string,
  ): Promise<Slide> {
    return this.slideRepository.searchSlide(
      slideIndex,
      slideSize,
      search_content,
    );
  }
}
