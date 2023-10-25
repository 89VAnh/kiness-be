"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const tsyringe_1 = require("tsyringe");
const promise_1 = require("mysql2/promise");
const config_1 = require("./config");
// Cấu hình kết nối MySQL
const connectionConfig = {
    host: config_1.config.db.host,
    port: config_1.config.db.port,
    user: config_1.config.db.username,
    password: config_1.config.db.password,
    database: config_1.config.db.database,
};
let Database = class Database {
    constructor() {
        this.pool = (0, promise_1.createPool)(connectionConfig);
    }
    async query(sql, values) {
        let connection = null;
        try {
            connection = await this.pool.getConnection();
            const [results] = await connection.query(sql, values);
            const [outParam] = await connection.query("SELECT @err_code, @err_msg");
            let err = outParam;
            if (err[0]["@err_code"] === 0) {
                return results;
            }
            else {
                throw new Error(err?.[0]?.["@err_msg"]);
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    }
    async queryList(sql, values) {
        let connection = null;
        try {
            connection = await this.pool.getConnection();
            const [results] = await connection.query(sql, values);
            const [outParam] = await connection.query("SELECT @err_code, @err_msg");
            let err = outParam;
            if (err[0]["@err_code"] === 0) {
                return results;
            }
            else {
                throw new Error(err[0]["@err_msg"]);
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            if (connection) {
                connection.release();
            }
        }
    }
};
exports.Database = Database;
exports.Database = Database = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], Database);
