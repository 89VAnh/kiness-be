import { injectable } from "tsyringe";
import { DashboardRepository } from "../repositories/dashboardRespository";
@injectable()
export class DashboardService {
  constructor(private dashboardRepository: DashboardRepository) {}

  async countCustomer(user_id: string): Promise<number> {
    return this.dashboardRepository.countCustomer(user_id);
  }

  async countExperienceRegister(user_id: string): Promise<number> {
    return this.dashboardRepository.countExperienceRegister(user_id);
  }

  async countTestRegister(user_id: string): Promise<number> {
    return this.dashboardRepository.countTestRegister(user_id);
  }

  async countBranchRegister(user_id: string): Promise<number> {
    return this.dashboardRepository.countBranchRegister(user_id);
  }

  async countEmployee(user_id: string): Promise<number> {
    return this.dashboardRepository.countEmployee(user_id);
  }

  async countNews(user_id: string): Promise<number> {
    return this.dashboardRepository.countNews(user_id);
  }

  async countBranch(user_id: string): Promise<number> {
    return this.dashboardRepository.countBranch(user_id);
  }
}
