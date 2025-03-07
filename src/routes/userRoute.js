import express from 'express';
const router = express.Router();
import controllerUser from '../models/user.js';

router.post('/users', controllerUser.createUser) 
router.get('/allUsers', controllerUser.getAllUsers)
router.put('/users/:id', controllerUser.updateUser)
router.delete('/users/:id', controllerUser.deleteUser)

export default router;
