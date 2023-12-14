import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadService } from "../services/uploadService";
import fs from "fs";
import { config } from "../../config/config";

const uploadRouter = express.Router();
const uploadService = container.resolve(UploadService);

uploadRouter.post(
  "/",
  uploadService.multerUpload,
  async (req: Request, res: Response) => {
    if (!req.file) {
      res
        .status(400)
        .json({ message: "Không thể upload được file", result: false });
      return;
    }

    const filePath = req.file.path;

    if (fs.existsSync(filePath) && req.body.type === "vat") {
      if (fs.statSync(filePath).size >= Number(config.limit_size)) {
        fs.unlinkSync(filePath);
        return res
          .status(400)
          .json({ message: "Không thể upload file quá 5MB", result: false });
      }
    }
    return res.json({ path: filePath, result: true });
  },
);

export default uploadRouter;
