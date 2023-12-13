import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { SearchVideoModel, Video } from "../models/video";
import { DatabaseError } from "../utils/DatabaseError";
import { UserError } from "../utils/UserError";
import { VideoService } from "../services/videoService";

@injectable()
export class VideoController {
    constructor (private videoService: VideoService) {}

    async createVideo(req: Request, res: Response): Promise<any> {
        try {
            const video = req.body as Video;
            await this.videoService.createVideo(video);
            res.json({message: "Thêm thành công", success: true});
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

    async updateVideo(req: Request, res: Response): Promise<any> {
        try {
            const video = req.body as Video;
            await this.videoService.updateVideo(video);
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

    async getDetailVideo(req: Request, res: Response): Promise<any> {
        try {
            const video_id = Number(req.params.id);
            const data = await this.videoService.getDetailVideo(video_id);
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

    async deleteVideo(req: Request, res: Response): Promise<any> {
        try {
            const video_id = Number(req.params.id);
            await this.videoService.deleteVideo(video_id);
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

    async SearchVideos(req: Request, res: Response): Promise<any> {
        try {
            const object = req.body as SearchVideoModel;
            const data = await this.videoService.searchVideos(object);
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