import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { RolePermissionService } from '../services/rolePermissionService';
import { DeleteRolePermissionModel} from '../models/role-permission';
@injectable()
export class RolePermissionController {
  constructor(private rfService: RolePermissionService 
  ) { }
  
  async createRolePermission(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as {role_permission_list:any, created_by_user_id:string}
      await this.rfService.createRolePermission(role.role_permission_list, role.created_by_user_id);
      res.json({ message: 'Đã thêm thành công',results:true });
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  

  async deleteRolePermission(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as DeleteRolePermissionModel;
      await this.rfService.deleteRolePermission(object);
      res.json({ message: 'Đã xóa thành công',results:true });
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  async getRolePermission(req: Request, res: Response): Promise<void> {
    try 
    {
        const role_id = req.params.roleid;
        const function_id = req.params.functionid;
        const data:any = await this.rfService.getRolePermission(role_id, function_id);
        if (data) {
          res.json(data);
        } else {
          res.json({ message: 'Bản ghi không tồn tại' });
        }
      } catch (error: any) {
        res.json({message: error.message});
      }
    }

}