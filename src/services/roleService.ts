import { injectable } from "tsyringe";
import { Role, SearchRole } from "../models/role";
import { RoleRepository } from "../repositories/roleRepository";

@injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async getRoleDropdown(): Promise<any> {
    return this.roleRepository.getRoleDropdown();
  }

  async getRoleById(id: string): Promise<any> {
    return this.roleRepository.getRoleById(id);
  }

  async createRole(role: Role): Promise<any> {
    return this.roleRepository.createRole(role);
  }

  async updateRole(role: Role): Promise<any> {
    return this.roleRepository.updateRole(role);
  }

  async deleteRole(list_json: any, lu_user_id: string): Promise<any> {
    return this.roleRepository.deleteRole(list_json, lu_user_id);
  }
  async searchRole(search: SearchRole): Promise<Role> {
    return this.roleRepository.searchRole(search);
  }
}
