import { injectable } from "tsyringe";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../models/user";
import { Action } from "../models/action";
import { Tree } from "../utils/tree";
import { verifyToken } from "../config/jwt";
var md5 = require("md5");

@injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private treeUltility: Tree,
  ) {}

  async authenticate(username: string, password: string): Promise<any> {
    let md5_pass = md5(password);
    let user = await this.userRepository.authenticate(username, md5_pass);
    if (user) {
      let functions = await this.userRepository.getFunctionByUserId(
        user.user_id,
      );
      let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
      let actions = await this.userRepository.getActionByUserId(user.user_id);
      let action_results = [];
      for (let row of actions) {
        let row_data = row as Action;
        action_results.push(row_data.action_code);
      }
      return {
        user_id: user.user_id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        full_name: user.full_name,
        avatar: user.avatar,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        email: user.email,
        phone_number: user.phone_number,
        user_name: user.user_name,
        online_flag: user.online_flag,
        is_guest: user.is_guest,
        functions: functionTree,
        actions: action_results,
      };
    }
    return null;
  }

  async authenticateEmployee(username: string, password: string): Promise<any> {
    let md5_pass = md5(password);
    let user = await this.userRepository.authenticateEmployee(
      username,
      md5_pass,
    );
    if (user) {
      let functions = await this.userRepository.getFunctionByUserId(
        user.user_id,
      );
      let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
      let actions = await this.userRepository.getActionByUserId(user.user_id);
      let action_results = [];
      for (let row of actions) {
        let row_data = row as Action;
        action_results.push(row_data.action_code);
      }
      return {
        user_id: user.user_id,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        position_id: user.position_id,
        full_name: user.full_name,
        avatar: user.avatar,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        email: user.email,
        phone_number: user.phone_number,
        user_name: user.user_name,
        online_flag: user.online_flag,
        is_guest: user.is_guest,
        functions: functionTree,
        actions: action_results,
      };
    }
    return null;
  }

  async createUser(user: User): Promise<any> {
    user.password = md5(user.password);
    return this.userRepository.createUser(user);
  }

  async updateUser(user: User): Promise<any> {
    return this.userRepository.updateUser(user);
  }

  async resetPassword(user: User): Promise<any> {
    const ran = Math.random();
    const password = Math.round(ran * 100000000) + "";
    user.password = md5(password);
    return this.userRepository.resetPassword(user, password);
  }

  async changePassword(user: any): Promise<any> {
    user.password = md5(user.password);
    user.new_password = md5(user.new_password);
    return this.userRepository.changePassword(user);
  }

  async getUserById(id: string): Promise<any> {
    return this.userRepository.getUserById(id);
  }

  async searchUser(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    user_name: string,
    full_name: string,
    gender: number,
    date_of_birth: Date,
    email: string,
    phone_number: string,
    description: string,
  ): Promise<any> {
    return this.userRepository.searchUser(
      pageIndex,
      pageSize,
      search_content,
      user_name,
      full_name,
      gender,
      date_of_birth,
      email,
      phone_number,
      description,
    );
  }

  async deleteUser(list_json: any, updated_by_id: string): Promise<any> {
    return this.userRepository.deleteUser(list_json, updated_by_id);
  }

  async authorize(token: string) {
    let user_data = verifyToken(token);
    console.log(user_data);

    if (user_data == null) throw new Error("Phiên đăng nhập hết hạn");
    let functions = await this.userRepository.getFunctionByUserId(
      user_data.user_id,
    );
    let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
    let actions = await this.userRepository.getActionByUserId(
      user_data.user_id,
    );
    let action_results = [];
    for (let row of actions) {
      let row_data = row as Action;
      action_results.push(row_data.action_code);
    }
    let data = {
      user_id: user_data.user_id,
      first_name: user_data.first_name,
      middle_name: user_data.middle_name,
      last_name: user_data.last_name,
      full_name: user_data.full_name,
      avatar: user_data.avatar,
      gender: user_data.gender,
      date_of_birth: user_data.date_of_birth,
      email: user_data.email,
      phone_number: user_data.phone_number,
      user_name: user_data.user_name,
      online_flag: user_data.online_flag,
      is_guest: user_data.is_guest,
      functions: functionTree,
      actions: action_results,
    };
    return data;
  }
}
