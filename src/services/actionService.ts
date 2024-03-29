import { injectable } from "tsyringe";
import { Action } from "../models/action";
import { ActionRepository } from "../repositories/actionRepository";

@injectable()
export class ActionService {
  constructor(private actionRepository: ActionRepository) {}

  async getActionById(id: string): Promise<any> {
    return this.actionRepository.getActionById(id);
  }

  async createAction(action: Action): Promise<any> {
    return this.actionRepository.createAction(action);
  }

  async updateAction(action: Action): Promise<any> {
    return this.actionRepository.updateAction(action);
  }

  async deleteAction(list_json: any, updated_by_id: string): Promise<any> {
    return this.actionRepository.deleteAction(list_json, updated_by_id);
  }

  async searchAction(
    page_index: number,
    page_size: number,
    search_content: string,
    function_id: string,
    action_code: string,
    action_name: string,
    description: string,
  ): Promise<any> {
    let dbResults = await this.actionRepository.searchAction(
      page_index,
      page_size,
      search_content,
      function_id,
      action_code,
      action_name,
      description,
    );
    return dbResults;
  }
}
