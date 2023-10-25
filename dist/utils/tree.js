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
exports.Tree = void 0;
const tsyringe_1 = require("tsyringe");
let Tree = class Tree {
    constructor() { }
    getFunctionTree(data, level, root) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].level == level && data[i].parent_id == root) {
                let row = Object.assign({}, data[i]);
                let lowerLevel = this.getFunctionTree(data, level + 1, row.function_id);
                let isLeaf = lowerLevel.length == 0;
                let levelResult = {
                    title: row.function_name,
                    key: row.function_id,
                    value: row.function_id,
                    parent_id: row.parent_id,
                    level: row.level,
                    url: row.url,
                    children: lowerLevel,
                    sort_order: row.sort_order,
                    is_leaf: isLeaf
                };
                result.push(levelResult);
            }
        }
        return result;
    }
};
exports.Tree = Tree;
exports.Tree = Tree = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], Tree);
