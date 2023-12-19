import { injectable } from 'tsyringe';
import { RolePermissionRepository } from '../repositories/rolePermissionRepository';
import { DeleteRolePermissionModel, RolePermission } from '../models/role-permission';
import { v4 as uuidv4 } from 'uuid';
@injectable()
export class RolePermissionService {
  constructor(private rfRepository: RolePermissionRepository
  ) {}

  async createRolePermission(role_permission_list:any, created_by_user_id:string): Promise<any> {
    // console.log(role_permission_list);
    for (let permission of role_permission_list)
      permission.role_permission_id = uuidv4();
    // console.log(role_permission_list);
    return this.rfRepository.createRolePermission(role_permission_list, created_by_user_id);
  }

  async deleteRolePermission(object: DeleteRolePermissionModel): Promise<any> {
    return this.rfRepository.deleteRolePermission(object);
  }

  async getRolePermission(role_id: string, function_id: string): Promise<any> {
    let data = await this.rfRepository.getRolePermission(role_id, function_id);
    let result = [];
    for(let row of data){
      let detail = row as RolePermission;
      result.push(detail.action_code);
    }
    return result;
  }

}