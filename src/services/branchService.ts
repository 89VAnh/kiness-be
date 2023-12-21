import { injectable } from "tsyringe";
import { Branch, SearchBranch } from "../models/branch";
import { BranchRepository } from "../repositories/branchRepository";

@injectable()
export class BranchService {
  constructor(private branchRepository: BranchRepository) {}

  async getBranchDropdown(city_id: string): Promise<any> {
    return this.branchRepository.getBranchDropdown(city_id);
  }

  async getBranchById(id: string): Promise<any> {
    return this.branchRepository.getBranchById(id);
  }

  async createBranch(branch: Branch): Promise<any> {
    return this.branchRepository.createBranch(branch);
  }

  async updateBranch(branch: Branch): Promise<any> {
    return this.branchRepository.updateBranch(branch);
  }

  async deleteBranch(list_json: any, lu_user_id: string): Promise<any> {
    return this.branchRepository.deleteBranch(list_json, lu_user_id);
  }
  async searchBranch(search: SearchBranch): Promise<Branch> {
    return this.branchRepository.searchBranch(search);
  }
}
