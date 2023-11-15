import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { SearchTestRegister, TestRegister } from "../models/test-register";
import { TestRegisterService } from "../services/testRegisterService";

@injectable()
export class TestRegisterController {
  constructor(private testService: TestRegisterService) {}

  async createTestRegister(req: Request, res: Response): Promise<void> {
    try {
      const testRegister = req.body as TestRegister;
      await this.testService.createTestRegister(testRegister);
      res.json({ message: "Đã thêm thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateTestRegister(req: Request, res: Response): Promise<void> {
    try {
      const testRegister = req.body as TestRegister;
      await this.testService.updateTestRegister(testRegister);
      res.json({ message: "Đã sửa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async updateTestRegisterStatus(req: Request, res: Response): Promise<void> {
    try {
      const testRegister = req.body as TestRegister;
      await this.testService.updateTestRegisterStatus(testRegister);
      res.json({ message: "Đã thay đổi trạng thái thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async searchTestRegister(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchTestRegister;
      const data: any = await this.testService.searchTestRegister(object);
      if (data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0,
          ),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.pageSize ? object.pageSize : 1),
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }

  async deleteTestRegister(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      await this.testService.deleteTestRegister(
        object.list_json,
        object.updated_by_id,
      );
      res.json({ message: "Đã xóa thành công", results: true });
    } catch (error: any) {
      res.json({ message: error.message, results: false });
    }
  }

  async printTestRegister(req: Request, res: Response): Promise<any> {
    try {
      const object = req.body as SearchTestRegister;
      const buffer: any = await this.testService.printTestRegister(object);
      if (buffer) {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        );

        const filename = "Danh sách đơn đăng ký trải nghiệm";
        res.setHeader(
          "Content-Disposition",
          `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
        );
        res.send(buffer);
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm" });
      }
    } catch (error: any) {
      res.json({ message: error.message });
    }
  }
}
