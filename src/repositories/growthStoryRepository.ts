import { Database } from "../config/database";
import { injectable } from "tsyringe";
import { DatabaseError } from "../utils/DatabaseError";
import { GrowthStoryModel, SearchClientGrowthStoryModel, SearchGrowthStoryModel } from "../models/growth-story";

@injectable()
export class GrowthStoryRepository {
    constructor (private db: Database) {}

    async createGrowthStory(gs: GrowthStoryModel) : Promise<any> {
        try {
            const sql = "CALL InsertGrowthStory(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                gs.title,
                gs.content,
                gs.image_link,
                gs.posted_date,
                gs.author_name,
                gs.is_draft,
                gs.created_by_user_id
            ]);
            return true;
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async updateGrowthStory(gs: GrowthStoryModel) : Promise<any> {
        try {
            const sql = "CALL UpdateGrowthStory(?, ?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                gs.growth_story_id,
                gs.title,
                gs.content,
                gs.image_link,
                gs.posted_date,
                gs.author_name,
                gs.is_draft,
                gs.lu_user_id
            ]);
            return true;
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async updateViewCountGrowthStory(growth_story_id: number): Promise<any> {
        try {
            const sql = "CALL UpdateViewCountGrowthStory(?, @err_code, @err_msg)";
            await this.db.query(sql, [
                growth_story_id
            ]);
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async deleteGrowthStory(growth_story_id: number) : Promise<any> {
        try {
            const sql = "CALL DeleteGrowthStory(?, @err_code, @err_msg)";
            await this.db.query(sql, [
                growth_story_id
            ]);
            return true;
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async getDetailGrowthStory(growth_story_id: number) : Promise<any> {
        try {
            const sql = "CALL GetDetailGrowthStory(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                growth_story_id
            ]);
            return results[0];
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async getDetailClientGrowthStory(growth_story_id: number) : Promise<any> {
        try {
            const sql = "CALL GetDetailClientGrowthStory(?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                growth_story_id
            ]);
            return results[0];
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async searchGrowthStories(search_gs_model: SearchGrowthStoryModel): Promise<any> {
        try {
            const sql = "CALL SearchGrowthStories(?, ?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                search_gs_model.pageIndex,
                search_gs_model.pageSize,
                search_gs_model.search_content,
                search_gs_model.is_draft
            ]);
            return results;
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }

    async searchClientGrowthStories(search_client_gs: SearchClientGrowthStoryModel): Promise<any> {
        try {
            const sql = "CALL SearchClientGrowthStories(?, ?, ?, @err_code, @err_msg)";
            const [results] = await this.db.query(sql, [
                search_client_gs.pageIndex,
                search_client_gs.pageSize,
                search_client_gs.search_content
            ]);
            return results;
        }
        catch(error: any) {
            throw new DatabaseError(error.message);
        }
    }
}