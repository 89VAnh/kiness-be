"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _, res, __) => {
    console.error("Lỗi:", err);
    res.status(500).json({ error: "Lỗi máy chủ" });
};
exports.errorHandler = errorHandler;
