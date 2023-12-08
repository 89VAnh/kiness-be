import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { GetClientReadRequestModel, RequestModel, SearchClientRequestModel, SearchRequestModel } from "../models/request";
import { DatabaseError } from "../utils/DatabaseError";

@injectable()
export class RequestRepository {
    constructor(private db: Database) {}

    async createRequest(req: RequestModel): Promise<any> {
        try {
            const sql = "CALL InsertRequest(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                req.subject,
                req.content,
                req.is_accepted,
                req.is_answered,
                req.answer,
                req.author_name,
                req.password,
                req.email,
                req.phone_number,
                req.created_by_user_id
            ]);
            return true;
        }
        catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async updateRequest(req: RequestModel): Promise<any> {
        try {
            const sql = "CALL UpdateRequest(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                req.request_id,
                req.subject,
                req.content,
                req.is_accepted,
                req.is_answered,
                req.answer,
                req.author_name,
                req.password,
                req.email,
                req.phone_number,
                req.lu_user_id
            ]);
            return true;
        }
        catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async deleteRequest(request_id: number): Promise<any> {
        try {
            const sql = "CALL DeleteRequest(?, @err_code, @err_msg)";
            await this.db.query(sql, [
                request_id
            ]);
            return true;
        }
        catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async getRequest(request_id: number): Promise<any> {
        try {
            const sql = "CALL GetRequest(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                request_id
            ]);
            return results[0];
        }
        catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async getClientReadRequest(req: GetClientReadRequestModel): Promise<any> {
        try {
            const sql = "CALL GetClientReadRequest(?, ?,@err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                req.request_id,
                req.password
            ]);
            return results[0];
        }
        catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async searchRequests(model: SearchRequestModel): Promise<any> {
        try {
            const sql = "CALL SearchRequests(?, ?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                model.pageIndex,
                model.pageSize,
                model.search_content,
                model.is_accepted,
                model.is_answered
            ]);
            return results;
        }
        catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async searchClientRequests(model: SearchClientRequestModel): Promise<any> {
        try {
            const sql = "CALL SearchClientRequests(?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                model.pageIndex,
                model.pageSize,
                model.search_content
            ]);
            return results;
        }
        catch (error: any) {
            throw new DatabaseError(error.message);
        }
    }

}