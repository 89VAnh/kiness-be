import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { RequestService } from "../services/requestService";
import { DatabaseError } from "../utils/DatabaseError";
import { GetClientReadRequestModel, RequestModel, SearchClientRequestModel, SearchRequestModel } from "../models/request";
import { UserError } from "../utils/UserError";

@injectable()
export class RequestController {
    constructor (private reqService: RequestService) {}

    async createRequest(req: Request, res: Response): Promise<any> {
        try {
            const req_model = req.body as RequestModel;
            await this.reqService.createRequest(req_model);
            res.json({message: "Đã tạo thành công", success: true});
        }
        catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else if (error instanceof UserError) {
                res.status(400).json({message: error.message, success: false});
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }

    async updateRequest(req: Request, res: Response): Promise<any> {
        try {
            const req_model = req.body as RequestModel;
            await this.reqService.updateRequest(req_model);
            res.json({message: "Cập nhật thành công", success: true});
        }
        catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else if (error instanceof UserError) {
                res.status(400).json({message: error.message, success: false});
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }

    async deleteRequest(req: Request, res: Response): Promise<any> {
        try {
            const req_id = Number(req.params.id);
            await this.reqService.deleteRequest(req_id);
            res.json({message: "Xóa thành công", success: true});
        }
        catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else if (error instanceof UserError) {
                res.status(400).json({message: error.message, success: false});
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }

    async getRequest(req: Request, res: Response): Promise<any> {
        try {
            const req_id = Number(req.params.id);
            var data = await this.reqService.getRequest(req_id);
            res.json({data: data, success: true});
        }
        catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else if (error instanceof UserError) {
                res.status(400).json({message: error.message, success: false});
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }

    async getClientReadRequest(req: Request, res: Response): Promise<any> {
        try {
            const reqModel = req.body as GetClientReadRequestModel;
            var data = await this.reqService.getClientReadRequest(reqModel);
            res.json({data: data, success: true});
        }
        catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else if (error instanceof UserError) {
                res.status(400).json({message: error.message, success: false});
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }

    async searchRequests(req: Request, res: Response): Promise<any> {
        try {
            const object = req.body as SearchRequestModel;
            var data = await this.reqService.searchRequests(object);
            if (data) {
                var results = {
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
                  };
                res.json({data: results, success: true});
              } else {
                res.json({ message: "Không tồn tại kết quả tìm kiếm", success: false });
              }
        }
        catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else if (error instanceof UserError) {
                res.status(400).json({message: error.message, success: false});
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }

    async searchClientRequests(req: Request, res: Response): Promise<any> {
        try {
            const object = req.body as SearchClientRequestModel;
            var data = await this.reqService.searchClientRequests(object);
            if (data) {
                var results = {
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
                  };
                res.json({data: results, success: true});
              } else {
                res.json({ message: "Không tồn tại kết quả tìm kiếm", success: false });
              }
        }
        catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else if (error instanceof UserError) {
                res.status(400).json({message: error.message, success: false});
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }
}