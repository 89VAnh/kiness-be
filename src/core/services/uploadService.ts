import { injectable } from "tsyringe";
import multer from "multer";
import path from "path";
import fs from "fs";

@injectable()
export class UploadService {
  private upload = multer({
    storage: multer.diskStorage({
      destination: (_, __, cb) => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const uploadDir = `uploads/${year}-${month}-${day}`;
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (_, file, cb) => {
        const filename =
          path.parse(file.originalname).name +
          "-" +
          Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, filename + extension);
      },
    }),
  }).single("file");

  get multerUpload() {
    return this.upload;
  }
}
