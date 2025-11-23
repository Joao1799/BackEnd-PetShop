import express from 'express';
const router = express.Router(); 
import controllerPet from '../models/pet.js';
import { verifyToken } from '../middlewares/verifyToken.js'


router.post('/createPets',verifyToken, controllerPet.createpet); 
router.get('/allPets',verifyToken, controllerPet.getAllpet); 
router.put('/editPets',verifyToken, controllerPet.updatepet); 
router.delete('/deletePets',verifyToken, controllerPet.deletepet); 

export default router;