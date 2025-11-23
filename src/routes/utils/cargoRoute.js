import express from 'express';
import controllerCargo from '../../models/utils/cargo.js'
import { verifyToken } from '../../middlewares/verifyToken.js'

const router = express.Router();

router.post('/createCargo',verifyToken,controllerCargo.createCargo)
router.get('/listCargo',verifyToken,controllerCargo.getAllCargos)
router.put('/editCargo',verifyToken,controllerCargo.updateCargo)
router.delete('/deleteCargo',verifyToken,controllerCargo.deleteCargo)

export default router;