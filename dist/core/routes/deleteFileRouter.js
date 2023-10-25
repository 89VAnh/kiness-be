"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const deleteFileService_1 = require("../services/deleteFileService");
const deleteFileRouter = express_1.default.Router();
const deleteFileService = tsyringe_1.container.resolve(deleteFileService_1.DeleteFileService);
deleteFileRouter.post("/", deleteFileService.deleteFile);
exports.default = deleteFileRouter;
