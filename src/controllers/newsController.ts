import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Database } from "../config/database";

@injectable()
export class NewsController {
  constructor(private db: Database) {}

  async getNews(_: Request, res: Response) {
    const data = await this.db.query("call get_news_procedure()", []);

    return res.json({ data });
  }
}
