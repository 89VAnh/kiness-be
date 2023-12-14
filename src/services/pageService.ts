import { injectable } from "tsyringe";
import { PageRepository } from "../repositories/pageRepository";
import { Page } from "../models/page";

@injectable()
export class PageService {
  constructor(private pageRepository: PageRepository) {}

  async getPageDropdown(): Promise<any> {
    return this.pageRepository.getPageDropdown();
  }

  async getPageById(id: string): Promise<any> {
    return this.pageRepository.getPageById(id);
  }

  async createPage(page: Page): Promise<any> {
    return this.pageRepository.createPage(page);
  }

  async updatePage(page: Page): Promise<any> {
    return this.pageRepository.updatePage(page);
  }

  async deletePage(list_json: any, updated_by_id: string): Promise<any> {
    return this.pageRepository.deletePage(list_json, updated_by_id);
  }
  async searchPage(
    pageIndex: number,
    pageSize: number,
    search_content: string,
  ): Promise<Page> {
    return this.pageRepository.searchPage(pageIndex, pageSize, search_content);
  }
}
