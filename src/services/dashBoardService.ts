import { injectable } from "tsyringe";
import { DashboardRepository } from "../repositories/dashboardRespository";
@injectable()
export class DashboardService {
  constructor(private dashboardRepository: DashboardRepository) {}

  async countExperienceRegister(user_id: string): Promise<any> {
    return this.dashboardRepository.countExperienceRegister(user_id);
  }

  async countEmployee(user_id: string): Promise<number> {
    return this.dashboardRepository.countEmployee(user_id);
  }

  async countBranch(user_id: string): Promise<number> {
    return this.dashboardRepository.countBranch(user_id);
  }
  
  async countRequest(): Promise<number> {
    return this.dashboardRepository.countRequest();
  }
}
