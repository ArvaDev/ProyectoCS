import { Router } from "express";
import { createClass, getClass, deleteClass } from "../controllers/classes";
const router = Router()

router.get('/classes/:id', getClass)
router.post('/classes', createClass)
router.delete('/classe/:id', deleteClass)

export default router