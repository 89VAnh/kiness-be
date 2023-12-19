import { Request, Response } from 'express';
import { injectable } from "tsyringe";
import { UserRoleService } from '../services/userRoleService';
import { DeleteUserRoleModel } from '../models/user-role';
@injectable()
export class UserRoleController {
  constructor(private rfService: UserRoleService 
  ) { }
  
  async createUserRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as {user_role_list:any, created_by_user_id:string}
      await this.rfService.createUserRole(role.user_role_list, role.created_by_user_id);
      res.json({ message: 'Đã thêm thành công',results:true });
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  

  async deleteUserRole(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as DeleteUserRoleModel;
      await this.rfService.deleteUserRole(object);
      res.json({ message: 'Đã xóa thành công',results:true });
    } catch (error: any) {
      res.json({ message: error.message, results:false });
    }
  }

  async getUserRole(req: Request, res: Response): Promise<void> {
    try 
    {
        const user_id = req.params.userid;
        const role_id = req.params.roleid;
        const data:any = await this.rfService.getUserRole(user_id, role_id);
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