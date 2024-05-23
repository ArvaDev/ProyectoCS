"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const ws_1 = require("./ws");
const user_1 = __importDefault(require("./src/routes/user")); // Usuarios
const classes_1 = __importDefault(require("./src/routes/classes")); // Clases
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//añadir cosas
app.use('/api', user_1.default);
app.use('/api', classes_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});
(0, ws_1.initWS)();
(0, config_1.connectDB)(); //conexión a la base de datos
