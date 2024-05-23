"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/users/:id', user_1.getUsersById);
router.get('/users', user_1.getUsersByName);
router.post('/users', user_1.createUser);
router.put('/users/:id', user_1.updateUserById);
router.put('/users/notification/:id', user_1.setNotification);
router.get('/users/notification/:id', user_1.getNotification);
router.delete('/users/:id', user_1.deleteUserById);
exports.default = router;