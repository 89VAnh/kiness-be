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

  async deletePosition(list_json: any, updated_by_id: string): Promise<any> {
    return this.positionRepository.deletePosition(list_json, updated_by_id);
  }
  async searchPosition(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    position_name: string,
    phone: string,
    fax: string,
    address: string,
  ): Promise<Position> {
    return this.positionRepository.searchPosition(
      pageIndex,
      pageSize,
      search_content,
      position_name,
      phone,
      fax,
      address,
    );
  }
}