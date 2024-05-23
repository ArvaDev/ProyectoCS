"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClass = exports.deleteClass = exports.createClass = void 0;
const uuid_1 = require("uuid");
const classes_1 = __importDefault(require("../models/classes"));
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chatID = (0, uuid_1.v4)();
    const newClass = new classes_1.default(Object.assign(Object.assign({}, req.body), { chat: { chat_id: chatID, messages: [] } }));
    newClass.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "No se ha podido crear la clase" }));
});
exports.createClass = createClass;
const deleteClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield classes_1.default.deleteOne({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err }));
});
exports.deleteClass = deleteClass;
const getClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield classes_1.default.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err }));
});
exports.getClass = getClass;
