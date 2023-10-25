"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config/config");
// Cấu hình chạy trên Server
app_1.default.set("port", config_1.config.port);
app_1.default.listen(app_1.default.get("port"), () => {
    console.log(`Server is running on port ${config_1.config.port}`);
});
