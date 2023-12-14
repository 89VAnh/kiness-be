import { injectable } from "tsyringe";
import { FAQRepository } from "../repositories/faqRepository";
import { FAQ, SearchFAQModel } from "../models/faq";

@injectable()
export class FAQService {
  constructor(private faqRepository: FAQRepository) {}

  async createFAQ(faq: FAQ): Promise<any> {
    return await this.faqRepository.createFAQ(faq);
  }

  async updateFAQ(faq: FAQ): Promise<any> {
    return await this.faqRepository.updateFAQ(faq);
  }

  async deleteFAQ(faq_id: number): Promise<any> {
    return await this.faqRepository.deleteFAQ(faq_id);
  }

  async getFAQDetail(faq_id: number): Promise<any> {
    return await this.faqRepository.getFAQDetail(faq_id);
  }

  async searchFAQs(faq_search: SearchFAQModel): Promise<any> {
    return await this.faqRepository.searchFAQs(faq_search);
  }
}
