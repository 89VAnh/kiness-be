"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadService = void 0;
class DownloadService {
    constructor() {
        this.download = function (req, res) {
            try {
                const filePath = req.body.filePath;
                res.download(filePath, function (err) {
                    if (err) {
                        res.status(400).json({ message: "Có lỗi xảy ra" });
                    }
                });
            }
            catch (err) {
                res.status(500).json({ message: "Không thể download" });
            }
        };
    }
    get downloadFile() {
        return this.download;
    }
}
exports.DownloadService = DownloadService;
