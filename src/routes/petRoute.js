import express from 'express';
const router = express.Router(); 
import controllerPet from '../models/pet.js';

router.post('/pets/:userId', controllerPet.createpet); 
router.get('/pets', controllerPet.getAllpet); 
router.put('/pets/:id', controllerPet.updatepet); 
router.delete('/pets/:id', controllerPet.deletepet); 

export default router;