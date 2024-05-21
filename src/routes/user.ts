import { Router } from "express";
import { createUser, getUsersById, getUsersByName, deleteUserById, updateUserById, setNotification } from "../controllers/user"
const router = Router()

router.get('/users/:id', getUsersById)
router.get('/users', getUsersByName)
router.post('/users', createUser)
router.put('/users/:id', updateUserById)
router.put('/users/notification/:id', setNotification)
router.delete('/users/:id', deleteUserById)

export default router