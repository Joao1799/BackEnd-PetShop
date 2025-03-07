import express from 'express';
import controllerUserFunc from '../models/userFunc.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const router = express.Router();

router.post('/usersFunc', controllerUserFunc.createUserFunc) 
router.post('/login/usersFunc', controllerUserFunc.loginUserFunc) 
router.get('/user/:id',verifyToken, controllerUserFunc.getUserFuncInfos);
router.get('/usersFunc', controllerUserFunc.getAllUsersFunc)
router.put('/usersFunc/:id', controllerUserFunc.updateUserFunc)
router.delete('/usersFunc/:id', controllerUserFunc.deleteUserFunc)

export default router;
