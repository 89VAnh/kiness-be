import { injectable } from "tsyringe";
import { RequestRepository } from "../repositories/requestRepository";
import { GetClientReadRequestModel, RequestModel, SearchClientRequestModel, SearchRequestModel } from "../models/request";
import { Md5 } from "ts-md5";
import { UserError } from "../utils/UserError";
@injectable()
export class RequestService{
    constructor (private reqRepository: RequestRepository) {}

    async createRequest(req: RequestModel): Promise<any> {
        if (req.password == undefined || req.password.trim() == "") {
            throw new UserError("Mật khẩu không được để trống")
        };
        var hashed_password = Md5.hashStr(req.password) ;
        req.password = hashed_password;
        await this.reqRepository.createRequest(req);
    }

    async updateRequest(req: RequestModel): Promise<any> {
        if (req.password == undefined || req.password.trim() == "") {
            throw new UserError("Mật khẩu không được để trống")
        };
        var hashed_password = Md5.hashStr(req.password) ;
        req.password = hashed_password;
        await this.reqRepository.updateRequest(req);
    }

    async deleteRequest(request_id: number): Promise<any> {
        await this.reqRepository.deleteRequest(request_id);
    }

    async getRequest(request_id: number): Promise<any> {
        return this.reqRepository.getRequest(request_id);
    }

    async getClientReadRequest(req: GetClientReadRequestModel) : Promise<any> {
        if (req.password == undefined || req.password.trim() == "") {
            throw new UserError("Mật khẩu không được để trống")
        };
        var hashed_password = Md5.hashStr(req.password) ;
        req.password = hashed_password;
        return this.reqRepository.getClientReadRequest(req);
    }

    async searchRequests(model: SearchRequestModel): Promise<any> {
        return this.reqRepository.searchRequests(model);
    }

    async searchClientRequests(object: SearchClientRequestModel): Promise<any> {
        return this.reqRepository.searchClientRequests(object);
    }

}