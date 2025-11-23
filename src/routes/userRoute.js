import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/verifyToken.js'
import controllerUser from '../models/user.js';

router.post('/users',verifyToken, controllerUser.createUser) 
router.get('/allUsers',verifyToken, controllerUser.getAllUsers)
router.put('/users',verifyToken, controllerUser.updateUser)
router.delete('/users/:id',verifyToken, controllerUser.deleteUser)

export default router;
