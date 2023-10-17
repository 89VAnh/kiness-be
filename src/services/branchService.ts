import { injectable } from "tsyringe";
import { Branch } from "../models/branch";
import { TestRegister } from "../models/test-register";
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

  async deleteBranch(list_json: any, updated_by_id: string): Promise<any> {
    return this.branchRepository.deleteBranch(list_json, updated_by_id);
  }
  async searchBranch(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    branch_name: string,
    phone: string,
    fax: string,
    address: string,
  ): Promise<Branch> {
    return this.branchRepository.searchBranch(
      pageIndex,
      pageSize,
      search_content,
      branch_name,
      phone,
      fax,
      address,
    );
  }

  async createTestRegister(testRegister: TestRegister): Promise<any> {
    return this.branchRepository.createTestRegister(testRegister);
  }
}
