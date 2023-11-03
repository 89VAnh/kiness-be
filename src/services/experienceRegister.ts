import { injectable } from "tsyringe";
import { ExperienceRegister } from "../models/experience-register";
import { ExperienceRegisterRepository } from "../repositories/experienceRegisterRepository";

@injectable()
export class ExperienceRegisterService {
  constructor(private experienceRepository: ExperienceRegisterRepository) {}

  async createExperienceRegister(
    experienceRegister: ExperienceRegister,
  ): Promise<any> {
    return this.experienceRepository.createExperienceRegister(
      experienceRegister,
    );
  }

  async searchExperienceRegister(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    branch_name: string,
    phone: string,
    address: string,
    from_date: Date,
    to_date: Date,
  ): Promise<any> {
    return this.experienceRepository.searchExperienceRegister(
      pageIndex,
      pageSize,
      search_content,
      branch_name,
      phone,
      address,
      from_date,
      to_date,
    );
  }

  async deleteExperienceRegister(
    list_json: any,
    updated_by_id: string,
  ): Promise<any> {
    return this.experienceRepository.deleteExperienceRegister(
      list_json,
      updated_by_id,
    );
  }
}
