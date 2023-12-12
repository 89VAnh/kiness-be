import { injectable } from "tsyringe";
import {
  LicenseOfInventionModel,
  SearchLicenseOfInventionModel,
} from "../models/license_of_invention";
import { LicenseOfInventionRepository } from "../repositories/licenseOfInventionRepository";

@injectable()
export class LicenseOfInventionService {
  constructor(
    private licenseOfInventionRepository: LicenseOfInventionRepository,
  ) {}

  async createLicenseOfInvention(os: LicenseOfInventionModel): Promise<any> {
    await this.licenseOfInventionRepository.createLicenseOfInvention(os);
  }

  async updateLicenseOfInvention(os: LicenseOfInventionModel): Promise<any> {
    await this.licenseOfInventionRepository.updateLicenseOfInvention(os);
  }

  async deleteLicenseOfInvention(
    license_id: number,
    lu_user_id: string,
  ): Promise<any> {
    await this.licenseOfInventionRepository.deleteLicenseOfInvention(
      license_id,
      lu_user_id,
    );
  }

  async getDetailLicenseOfInvention(obesity_story_id: number): Promise<any> {
    return await this.licenseOfInventionRepository.getDetailLicenseOfInvention(
      obesity_story_id,
    );
  }

  async SearchLicenses(
    search_os_model: SearchLicenseOfInventionModel,
  ): Promise<any> {
    return await this.licenseOfInventionRepository.SearchLicenses(
      search_os_model,
    );
  }
}
