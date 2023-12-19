import { injectable } from "tsyringe";
import { HistoryModel, SearchHistoryModel } from "../models/history";
import { HistoryRepository } from "../repositories/historyRepository";
@injectable()
export class HistoryService {
  constructor(private reqRepository: HistoryRepository) {}

  async createHistory(req: HistoryModel): Promise<any> {
    await this.reqRepository.createHistory(req);
  }

  async updateHistory(req: HistoryModel): Promise<any> {
    await this.reqRepository.updateHistory(req);
  }

  async deleteHistory(id: number, lu_user_id: string): Promise<any> {
    await this.reqRepository.deleteHistory(id, lu_user_id);
  }

  async getHistoryDetail(id: number): Promise<any> {
    return this.reqRepository.getHistoryDetail(id);
  }

  async searchHistories(search: SearchHistoryModel): Promise<any> {
    return this.reqRepository.searchHistories(search);
  }
}
