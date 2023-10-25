"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_multiRouter_1 = __importDefault(require("./upload-multiRouter"));
const uploadRouter_1 = __importDefault(require("./uploadRouter"));
const downloadRouter_1 = __importDefault(require("./downloadRouter"));
const deleteFileRouter_1 = __importDefault(require("./deleteFileRouter"));
const core_router = (0, express_1.Router)();
core_router.use("/upload-multi", upload_multiRouter_1.default);
core_router.use("/upload", uploadRouter_1.default);
core_router.use("/download", downloadRouter_1.default);
core_router.use("/delete-file", deleteFileRouter_1.default);
exports.default = core_router;
