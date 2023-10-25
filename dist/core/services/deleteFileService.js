"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFileService = void 0;
const fs_1 = __importDefault(require("fs"));
class DeleteFileService {
    constructor() {
        this.delete = function (req, res) {
            try {
                const filePath = req.body.filePath;
                if (fs_1.default.existsSync(filePath))
                    fs_1.default.unlinkSync(filePath);
                else
                    return res.status(200).json({ message: "File không tồn tại" });
                res.status(200).json({ message: "Xóa file thành công" });
            }
            catch (err) {
                res.status(500).json({ message: "Không thể xóa" });
            }
        };
    }
    get deleteFile() {
        return this.delete;
    }
}
exports.DeleteFileService = DeleteFileService;
