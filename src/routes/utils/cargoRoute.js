import express from 'express';
import controllerCargo from '../../models/utils/cargo.js'
const router = express.Router();

router.post('/createCargo',controllerCargo.createCargo)
router.get('/listCargo',controllerCargo.getAllCargos)
router.put('/editCargo',controllerCargo.updateCargo)
// router.delete('/deleteCargo',controllerCargo)

export default router;