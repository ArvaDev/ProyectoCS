"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classes_1 = require("../controllers/classes");
const router = (0, express_1.Router)();
router.get('/classes/:id', classes_1.getClass);
router.post('/classes', classes_1.createClass);
router.delete('/classe/:id', classes_1.deleteClass);
exports.default = router;
