import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { FAQTopic } from "../models/faq-topic";
import {DatabaseError} from "../utils/DatabaseError"

@injectable()
export class FAQTopicRepository{
    constructor(private db: Database) {}

    async createFAQTopic(faqTopic: FAQTopic): Promise<any>{
        try{
            const sql = "CALL InsertFAQTopic(?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                faqTopic.topic_name,
                faqTopic.created_by_user_id
            ]);
            return true;
        }
        catch(error: any){
            throw new DatabaseError(error.message);
        }
    }

    async updateFAQTopic(faqTopic: FAQTopic): Promise<any>{
        try{
            const sql = "CALL UpdateFAQTopic(?, ?, ?, @err_code, @err_msg)";
            await this.db.query(sql, [
                faqTopic.topic_id,
                faqTopic.topic_name,
                faqTopic.lu_user_id
            ]);
            return true;
        }
        catch(error: any){
            throw new DatabaseError(error.message);
        }
    }

    async deleteFAQTopic(topic_id: number) : Promise<any> {
        try{
            const sql = "CALL DeleteFAQTopic(?, @err_code, @err_msg)";
            await this.db.query(sql, [
                topic_id
            ]);
            return true;
        }
        catch(error: any){
            throw new DatabaseError(error.message);
        }
    }

    async getFAQTopic(topic_id: number): Promise<any> {
        try{
            const sql = "CALL GetFAQTopic(?, @err_code, @err_msg)";
            var [results] = await this.db.query(sql, [
                topic_id
            ]);
            return results[0];
        }
        catch(error: any){
            throw new DatabaseError(error.message);
        }
    }

    async getFAQTopicDropdown(): Promise<any> {
        try{
            const sql = "CALL GetFAQTopicsDropdown(@err_code, @err_msg)";
            var [results] = await this.db.query(sql, []);
            return results;
        }
        catch(error: any){
            throw new DatabaseError(error.message);
        }
    }

    async searchFAQTopics(pageIndex: number, pageSize: number, searchContent?: string, topic_id?: number): Promise<any> {
        try{
            const sql = "CALL SearchFAQTopics(?, ?, ?, ?, @err_code, @err_msg)";
            var [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                searchContent,
                topic_id
            ]);
            return results;
        }
        catch(error: any){
            throw new DatabaseError(error.message);
        }
    }
}