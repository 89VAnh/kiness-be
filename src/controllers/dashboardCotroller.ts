import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { DashboardService } from "../services/dashBoardService";

@injectable()
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async countCustomer(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.params.user_id;
      const data: any = await this.dashboardService.countCustomer(user_id);

      if (data && data.length > 0) {
        let total: any = data[0][0];
        if (total) {
          res.json(total);
        } else {
          res.json({ message: "Bản ghi không tồn tại" });
        }
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async countExperienceRegister(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body as { user_id: string };
      const user_id = body.user_id;

      const total: number =
        await this.dashboardService.countExperienceRegister(user_id);
      if (total === 0 || total) {
        res.json({ total });
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async countTestRegister(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.params.user_id;
      const data: any = await this.dashboardService.countTestRegister(user_id);

      if (data && data.length > 0) {
        let total: any = data[0][0];
        if (total) {
          res.json(total);
        } else {
          res.json({ message: "Bản ghi không tồn tại" });
        }
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async countBranchRegister(req: Request, res: Response): Promise<void> {
    try {
      const user_id = req.params.user_id;
      const data: any =
        await this.dashboardService.countBranchRegister(user_id);

      if (data && data.length > 0) {
        let total: any = data[0][0];
        if (total) {
          res.json(total);
        } else {
          res.json({ message: "Bản ghi không tồn tại" });
        }
      } else {
        res.json({ message: "Bản ghi không tồn tại" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
}
