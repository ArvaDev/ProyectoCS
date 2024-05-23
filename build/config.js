"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb://127.0.0.1:27017/Proyecto_CS";
const connectDB = () => {
    mongoose_1.default.connect(uri, {})
        .then(() => { console.log("Conexión exitosa"); })
        .catch(err => { console.error("Error de conexión", err); });
};
exports.connectDB = connectDB;
