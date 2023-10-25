"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const uploadService_1 = require("../services/uploadService");
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../../config/config");
const uploadRouter = express_1.default.Router();
const uploadService = tsyringe_1.container.resolve(uploadService_1.UploadService);
uploadRouter.post("/", uploadService.multerUpload, async (req, res) => {
    if (!req.file) {
        res
            .status(400)
            .json({ message: "Không thể upload được file", result: false });
        return;
    }
    const filePath = req.file.path;
    if (fs_1.default.existsSync(filePath) && req.body.type === "vat") {
        if (fs_1.default.statSync(filePath).size >= Number(config_1.config.limit_size)) {
            fs_1.default.unlinkSync(filePath);
            return res
                .status(400)
                .json({ message: "Không thể upload file quá 5MB", result: false });
        }
    }
    return res.json({ path: filePath, result: true });
});
exports.default = uploadRouter;
