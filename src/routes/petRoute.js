import express from 'express';
const router = express.Router(); 
import controllerPet from '../models/pet.js';

router.post('/createPets', controllerPet.createpet); 
router.get('/allPets', controllerPet.getAllpet); 
router.put('/editPets', controllerPet.updatepet); 
router.delete('/deletePets', controllerPet.deletepet); 

export default router;