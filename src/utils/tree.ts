import { injectable } from "tsyringe";
import { DiagramModel } from "../models/diagram";
import { FunctionModel } from "../models/function";
import { DiagramRepository } from "../repositories/diagramRepository";
import { FunctionRepository } from "../repositories/functionRepository";
@injectable()
export class Tree {
  constructor(
    private functionRepository: FunctionRepository,
    private diagramRepository: DiagramRepository,
  ) {}

  getFunctionTree(data: any[], level: number, root: string): any[] {
    let result: any[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].level == level && data[i].parent_id == root) {
        let row = Object.assign({}, data[i]);
        let lowerLevel: any[] = this.getFunctionTree(
          data,
          level + 1,
          row.function_id,
        );
        let isLeaf = lowerLevel.length == 0;
        let levelResult = {
          title: row.function_name,
          key: row.function_id,
          value: row.function_id,
          parent_id: row.parent_id,
          level: row.level,
          url: row.url,
          children: lowerLevel,
          sort_order: row.sort_order,
          is_leaf: isLeaf,
        };
        result.push(levelResult);
      }
    }
    return result;
  }

  async searchFunctionTree(data: FunctionModel[]): Promise<FunctionModel[]> {
    const result: FunctionModel[] = [];
    for (const func of data) {
      let node: FunctionModel = func;
      if (!result.some((x) => x.function_id === node.function_id))
        result.push(node);
      while (node.parent_id !== "0") {
        node = await this.functionRepository.getFunctionById(node.parent_id);

        if (!result.some((x) => x.function_id === node.function_id))
          result.push(node);
      }
    }

    return result;
  }

  getDiagramTree(data: any[], level: number, root: string): any[] {
    let result: any[] = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.level == level && data[i]?.parent_id == root) {
        let row = Object.assign({}, data[i]);
        let lowerLevel: any[] = this.getDiagramTree(
          data,
          level + 1,
          row.node_id,
        );
        let isLeaf = lowerLevel.length == 0;
        let levelResult = {
          title: row.node_name,
          key: row.node_id,
          value: row.node_id,
          parent_id: row.parent_id,
          level: row.level,
          color: row.color,
          children: lowerLevel,
          sort_order: row.sort_order,
          is_leaf: isLeaf,
        };
        result.push(levelResult);
      }
    }
    return result;
  }

  async searchDiagramTree(data: DiagramModel[]): Promise<DiagramModel[]> {
    const result: DiagramModel[] = [];
    for (const diagram of data) {
      let node: DiagramModel = diagram;
      if (!result.some((x) => x?.node_id === node?.node_id)) result.push(node);
      while (node !== null && node?.parent_id !== "0") {
        if (node?.parent_id)
          node = await this.diagramRepository.getNodeById(node.parent_id);
        else break;

        if (!result.some((x) => x?.node_id === node?.node_id))
          result.push(node);
      }
    }

    return result;
  }
}
