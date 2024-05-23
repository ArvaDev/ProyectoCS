"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    class_name: { type: String, require: true },
    teacher: { type: String, require: true },
    chat: {
        chat_id: { type: String },
        messages: [Object]
    },
    users: [Object], //Aqui va quienes son los profesores y alumnos con sus respectivos roles
    posts: [Object]
});
const Class = (0, mongoose_1.model)('Classes', classSchema);
exports.default = Class;
