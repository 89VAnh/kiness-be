import { injectable } from "tsyringe";
import { Researcher } from "../models/researcher";
import { ResearcherRepository } from "../repositories/researcherRepository";

@injectable()
export class ResearcherService {
  constructor(private researcherRepository: ResearcherRepository) {}

  async getResearcherById(id: string): Promise<any> {
    return this.researcherRepository.getResearcherById(id);
  }

  async createResearcher(researcher: Researcher): Promise<any> {
    return this.researcherRepository.createResearcher(researcher);
  }

  async updateResearcher(researcher: Researcher): Promise<any> {
    return this.researcherRepository.updateResearcher(researcher);
  }

  async deleteResearcher(list_json: any, updated_by_id: string): Promise<any> {
    return this.researcherRepository.deleteResearcher(list_json, updated_by_id);
  }

  async searchResearcher(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    researcher_title: string,
    content: string,
  ): Promise<Researcher> {
    return this.researcherRepository.searchResearcher(
      pageIndex,
      pageSize,
      search_content,
      researcher_title,
      content,
    );
  }
}
