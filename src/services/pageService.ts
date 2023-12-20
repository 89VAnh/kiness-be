import { injectable } from "tsyringe";
import { Page } from "../models/page";
import { PageRepository } from "../repositories/pageRepository";

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

  async deletePage(list_json: any, lu_user_id: string): Promise<any> {
    return this.pageRepository.deletePage(list_json, lu_user_id);
  }
  async searchPage(
    page_index: number,
    page_size: number,
    search_content: string,
  ): Promise<Page> {
    return this.pageRepository.searchPage(
      page_index,
      page_size,
      search_content,
    );
  }
}
