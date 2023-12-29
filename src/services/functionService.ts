import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { FunctionModel, SearchFunctionsModel } from "../models/function";
import { FunctionRepository } from "../repositories/functionRepository";
import { Tree } from "../utils/tree";

@injectable()
export class FunctionService {
  constructor(
    private functionRepository: FunctionRepository,
    private treeUltility: Tree,
  ) {}

  async getFunctionById(id: string): Promise<any> {
    return this.functionRepository.getFunctionById(id);
  }

  async createFunction(func: FunctionModel): Promise<any> {
    func.function_id = uuidv4();
    func.parent_id = func.parent_id == null ? "" : func.parent_id;
    return this.functionRepository.createFunction(func);
  }

  async updateFunction(func: FunctionModel): Promise<any> {
    return this.functionRepository.updateFunction(func);
  }

  async deleteFunction(list_json: any, lu_user_id: string): Promise<any> {
    return this.functionRepository.deleteFunction(list_json, lu_user_id);
  }

  async searchFunction(search: SearchFunctionsModel): Promise<any> {
    let dbResults = await this.functionRepository.searchFunction(search);
    if (search.search_content)
      dbResults = await this.treeUltility.searchFunctionTree(dbResults);
    let data = this.treeUltility.getFunctionTree(dbResults, 1, "0"); //this.getResultTree(dbResults, 1, "0");
    return data;
  }

  async getFunctionByRole(role_id: string) {
    return this.functionRepository.getFunctionsByRolesId(role_id);
  }
}
