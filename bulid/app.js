"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const router = express_1.default.Router();
app.use(router);
const PORT = 3000;
router.get('/', (_req, res) => {
    res.send("Hola mundo!");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});
