"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const upload_multiService_1 = require("../services/upload-multiService");
const uploadmultiRouter = express_1.default.Router();
const uploadMultiService = tsyringe_1.container.resolve(upload_multiService_1.UploadMultiService);
uploadmultiRouter.post("/", uploadMultiService.multerMultiUpload, (req, res) => {
    if (!req.files) {
        res.json({ error: "Không thể upload được file" });
        return;
    }
    const uploadedFiles = req.files;
    const fileUrls = [];
    uploadedFiles.forEach((file) => {
        fileUrls.push(file.path);
    });
    res.json(fileUrls);
});
exports.default = uploadmultiRouter;
