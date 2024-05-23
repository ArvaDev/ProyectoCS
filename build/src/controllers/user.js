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
exports.setNotification = exports.getNotification = exports.updateUserById = exports.deleteUserById = exports.getUsersById = exports.getUsersByName = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default(req.body);
    user.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "No se puede crear el ususario" }));
});
exports.createUser = createUser;
const getUsersByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    yield user_1.default.find({ name: name })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "Internal Server" }));
});
exports.getUsersByName = getUsersByName;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "Internal Server" }));
});
exports.getUsersById = getUsersById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.deleteOne({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "No se ha podido borrar el usuario" }));
});
exports.deleteUserById = deleteUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userOb = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        notifications: req.body.notifications,
        classes: req.body.classes,
        roll: req.body.roll
    };
    yield user_1.default.updateOne({ _id: req.params.id }, { $set: userOb })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ err: err, message: "No se ha podido actualizar el usuario" }));
});
exports.updateUserById = updateUserById;
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findOne({ _id: req.params.id })
        .then(data => res.status(200).json(data === null || data === void 0 ? void 0 : data.notifications))
        .catch(err => res.status(500).json({ err: err, message: "No se ha podido borrar el usuario" }));
});
exports.getNotification = getNotification;
const setNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.updateOne({ _id: req.params.id }, { $push: { notifications: req.body } })
        .then(data => { res.status(200).json(data); })
        .catch(err => res.status(500).json({ err: err }));
});
exports.setNotification = setNotification;
