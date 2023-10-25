"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const downloadService_1 = require("../services/downloadService");
const downloadRouter = express_1.default.Router();
const downloadService = tsyringe_1.container.resolve(downloadService_1.DownloadService);
downloadRouter.post("/", downloadService.downloadFile);
exports.default = downloadRouter;
