import { injectable } from "tsyringe";
import { FAQTopicRepository } from "../repositories/faq-topicRespository";
import { FAQTopic } from "../models/faq-topic";

@injectable()
export class FAQTopicService{
    constructor (private faqTopicRepository: FAQTopicRepository){}

    async createFAQTopic(faqTopic: FAQTopic): Promise<any>{
        return await this.faqTopicRepository.createFAQTopic(faqTopic);
    }

    async updateFAQTopic(faqTopic: FAQTopic): Promise<any>{
        return await this.faqTopicRepository.updateFAQTopic(faqTopic);
    }

    async deleteFAQTopic(topic_id: number){
        return await this.faqTopicRepository.deleteFAQTopic(topic_id);
    }

    async getFAQTopic(topic_id: number) {
        return await this.faqTopicRepository.getFAQTopic(topic_id);
    }

    async getFAQTopicDropdown() {
        return await this.faqTopicRepository.getFAQTopicDropdown();
    }

    async searchFAQTopics(pageIndex: number, pageSize: number, searchContent?: string, topic_id?: number): Promise<any>{
        return await this.faqTopicRepository.searchFAQTopics(pageIndex, pageSize, searchContent, topic_id);
    }

}