import express from 'express';
import controllerUserFunc from '../models/userFunc.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const router = express.Router();

router.post('/registerUsersFunc', controllerUserFunc.createUserFunc) 
router.post('/login/usersFunc', controllerUserFunc.loginUserFunc) 
router.get('/user/:id',verifyToken, controllerUserFunc.getUserFuncInfos);
router.get('/usersFunc',verifyToken, controllerUserFunc.getAllUsersFunc)
router.put('/usersFunc/:id',verifyToken, controllerUserFunc.updateUserFunc)
router.delete('/usersFunc/:id',verifyToken, controllerUserFunc.deleteUserFunc)

export default router;
