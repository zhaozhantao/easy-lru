"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("."));
var lru = new _1.default(10, function (key) {
    console.log("remove", key);
});
lru.use("a", 4);
lru.use("b", 4);
lru.use("a", 4);
lru.use("c", 4);
