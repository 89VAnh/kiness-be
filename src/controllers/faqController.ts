import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { DatabaseError } from "../utils/DatabaseError";
import { FAQService } from "../services/faqService";
import { FAQ, SearchFAQModel } from "../models/faq";

@injectable()
export class FAQController {
    constructor (private faqService: FAQService) {}

    async createFAQ(req: Request, res: Response): Promise<any> {
        try{
            const faq = req.body as FAQ;
            await this.faqService.createFAQ(faq);
            res.json({message: "Đã thêm thành công", success: true});
        } catch(error: any){
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
            
        }
    }

    async updateFAQ(req: Request, res: Response): Promise<any> {
        try{
            const faq = req.body as FAQ;
            await this.faqService.updateFAQ(faq);
            res.json({message: "Cập nhật thành công", success: true});
        } catch(error: any){
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
            
        }
    }

    async deleteFAQ(req: Request, res: Response): Promise<any> {
        try{
            const faq_id = Number(req.params.id);
            await this.faqService.deleteFAQ(faq_id);
            res.json({message: "Xóa thành công", success: true});
        } catch(error: any){
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
            
        }
    }

    async getFAQDetail(req: Request, res: Response): Promise<any> {
        try{
            const faq_id = Number(req.params.id);
            let data = await this.faqService.getFAQDetail(faq_id);
            res.json({data: data, success: true});
        } catch(error: any){
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
            
        }
    }

    async searchFAQs(req: Request, res: Response): Promise<any> {
        try {
            var object = req.body as SearchFAQModel;
            var data = await this.faqService.searchFAQs(object);
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
        } catch (error: any) {
            if (error instanceof DatabaseError){
                res.json({message: error.message, success: false})
            }
            else{
                console.log(error.message);
                res.json({message: "Đã xảy ra lỗi", success: false});
            }
        }
    }
}