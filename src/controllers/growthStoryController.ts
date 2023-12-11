import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { GrowthStoryService } from "../services/growthStoryService";
import { GrowthStoryModel, SearchClientGrowthStoryModel, SearchGrowthStoryModel } from "../models/growth-story";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";

@injectable()
export class GrowthStoryController {
    constructor (private growthStoryService: GrowthStoryService) {}

    async createGrowthStory(req: Request, res: Response): Promise<any> {
        try {
            const gs_model = req.body as GrowthStoryModel;
            await this.growthStoryService.createGrowthStory(gs_model);
            res.json({message: "Đã thêm thành công", success: true});
        }
        catch(error: any) {
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

    async updateGrowthStory(req: Request, res: Response): Promise<any> {
        try {
            const gs_model = req.body as GrowthStoryModel;
            await this.growthStoryService.updateGrowthStory(gs_model);
            res.json({message: "Cập nhật thành công", success: true});
        }
        catch(error: any) {
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

    async updateViewCountGrowthStory(req: Request, res: Response): Promise<any> {
        try {
            const growth_story_id = Number(req.params.id);
            await this.growthStoryService.updateViewCountGrowthStory(growth_story_id);
            res.json({message: "Cập nhật thành công", success: true});
        }
        catch(error: any) {
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

    async deleteGrowthStory(req: Request, res: Response): Promise<any> {
        try {
            const growth_story_id = Number(req.params.id);
            await this.growthStoryService.deleteGrowthStory(growth_story_id);
            res.json({message: "Xóa thành công", success: true});
        }
        catch(error: any) {
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

    async getDetailGrowthStory(req: Request, res: Response): Promise<any> {
        try {
            const growth_story_id = Number(req.params.id);
            const data = await this.growthStoryService.getDetailGrowthStory(growth_story_id);
            res.json({data: data, success: true});
        }
        catch(error: any) {
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

    async getDetailClientGrowthStory(req: Request, res: Response): Promise<any> {
        try {
            const growth_story_id = Number(req.params.id);
            const data = await this.growthStoryService.getDetailClientGrowthStory(growth_story_id);
            res.json({data: data, success: true});
        }
        catch(error: any) {
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

    async searchGrowthStories(req: Request, res: Response): Promise<any> {
        try {
            const object = req.body as SearchGrowthStoryModel;
            const data = await this.growthStoryService.searchGrowthStories(object);
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
        catch(error: any) {
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

    async searchClientGrowthStories(req: Request, res: Response): Promise<any> {
        try {
            const object = req.body as SearchClientGrowthStoryModel;
            const data = await this.growthStoryService.searchClientGrowthStories(object);
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
        catch(error: any) {
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