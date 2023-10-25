"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const mysql2_1 = __importDefault(require("mysql2"));
const errorHandler_1 = require("./errors/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_2 = __importDefault(require("./core/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Sử dụng cors middleware
app.use((0, cors_1.default)());
// Middleware để xử lý dữ liệu đầu vào
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Sử dụng router
// app.use('/api', core_router);
app.use("/api", routes_1.default);
app.use("/api-core", routes_2.default);
// Đăng ký middleware xử lý lỗi toàn cục
app.use(errorHandler_1.errorHandler);
// Middleware tùy chỉnh để xử lý dữ liệu đầu vào
app.use((req, _, next) => {
    // Xử lý dữ liệu đầu vào của request trước khi tiếp tục xử lý
    req.body = escapeRequestBody(req.body);
    next();
});
// Hàm tùy chỉnh để escape dữ liệu đầu vào
function escapeRequestBody(data) {
    // Xử lý và escape dữ liệu theo ý muốn của bạn
    // Ví dụ: sử dụng mysql.escape để escape dữ liệu
    if (typeof data === "object") {
        for (let key in data) {
            if (typeof data[key] === "string") {
                data[key] = mysql2_1.default.escape(data[key]);
            }
        }
    }
    return data;
}
// Xử lý các route không tồn tại
app.use((_, res) => {
    res.json({ message: "Không tìm thấy đường dẫn" });
});
exports.default = app;
