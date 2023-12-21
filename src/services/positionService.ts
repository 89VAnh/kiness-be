import { injectable } from "tsyringe";
import { Position } from "../models/position";
import { PositionRepository } from "../repositories/positionRepository";

@injectable()
export class PositionService {
  constructor(private positionRepository: PositionRepository) {}

  async getPositionDropdown(): Promise<any> {
    return this.positionRepository.getPositionDropdown();
  }

  async getPositionById(id: string): Promise<any> {
    return this.positionRepository.getPositionById(id);
  }

  async createPosition(position: Position): Promise<any> {
    return this.positionRepository.createPosition(position);
  }

  async updatePosition(position: Position): Promise<any> {
    return this.positionRepository.updatePosition(position);
  }

  async deletePosition(list_json: any, lu_user_id: string): Promise<any> {
    return this.positionRepository.deletePosition(list_json, lu_user_id);
  }
  async searchPosition(
    page_index: number,
    page_size: number,
    search_content: string,
    position_name: string,
  ): Promise<Position> {
    return this.positionRepository.searchPosition(
      page_index,
      page_size,
      search_content,
      position_name,
    );
  }
}
