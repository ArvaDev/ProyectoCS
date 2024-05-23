"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWS = void 0;
const ws_1 = __importDefault(require("ws"));
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer();
const wss = new ws_1.default.Server({ server });
//const groups : {[key: string]: Set<WebSocket>} = {}
const initWS = () => {
    wss.on('connection', (ws) => {
        console.log('Cliente conectado');
        ws.on('message', (message) => {
            const textMessage = Buffer.from(message).toString('binary');
            console.log(textMessage);
        });
        ws.on('close', () => {
            console.log('Cliente desconectado');
        });
    });
};
exports.initWS = initWS;
