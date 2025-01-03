import express from 'express';
import atendimentoController from '../models/atendimento.js';
const router = express.Router();


router.post('/users/:userId/pets/:petId/atendimentos', atendimentoController.createAtendimento);
router.get('/atendimento', atendimentoController.getAllAtendimentos);
router.put('/atendimento/:id', atendimentoController.updateAtendimento);
router.delete('/atendimento/:id', atendimentoController.deleteAtendimento);

export default router;