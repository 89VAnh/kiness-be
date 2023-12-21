import { injectable } from "tsyringe";
import { DiagramRepository } from "../repositories/diagramRepository";
import { v4 as uuidv4 } from "uuid";
import { Tree } from "../utils/tree";
import { DiagramModel, SearchNodesModel } from "../models/diagram";

@injectable()
export class DiagramService {
  constructor(
    private diagramRepository: DiagramRepository,
    private treeUltility: Tree,
  ) {}

  async getNodeById(id: string): Promise<any> {
    return this.diagramRepository.getNodeById(id);
  }

  async createNode(diagram: DiagramModel): Promise<any> {
    diagram.node_id = uuidv4();
    diagram.parent_id = diagram.parent_id == null ? "" : diagram.node_id;
    return this.diagramRepository.createNode(diagram);
  }

  async updateNode(diagram: DiagramModel): Promise<any> {
    return this.diagramRepository.updateNode(diagram);
  }

  async deleteNode(list_json: any): Promise<any> {
    return this.diagramRepository.deleteNode(list_json);
  }

  async searchNodes(
    model: SearchNodesModel
  ): Promise<any> {
    let dbResults = await this.diagramRepository.searchNodes(
      model
    );
    let data = this.treeUltility.getDiagramTree(dbResults, 1, "0"); //this.getResultTree(dbResults, 1, "0");
    return data;
  }

}
