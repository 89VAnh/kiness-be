"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const tsyringe_1 = require("tsyringe");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let UploadService = class UploadService {
    constructor() {
        this.upload = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: (_, __, cb) => {
                    const date = new Date();
                    const year = date.getFullYear().toString();
                    const month = (date.getMonth() + 1).toString().padStart(2, "0");
                    const day = date.getDate().toString().padStart(2, "0");
                    const uploadDir = `uploads/${year}-${month}-${day}`;
                    if (!fs_1.default.existsSync(uploadDir)) {
                        fs_1.default.mkdirSync(uploadDir, { recursive: true });
                    }
                    cb(null, uploadDir);
                },
                filename: (_, file, cb) => {
                    const filename = path_1.default.parse(file.originalname).name +
                        "-" +
                        Math.round(Math.random() * 1e9);
                    const extension = path_1.default.extname(file.originalname);
                    cb(null, filename + extension);
                },
            }),
        }).single("file");
    }
    get multerUpload() {
        return this.upload;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, tsyringe_1.injectable)()
], UploadService);
