import express from 'express';
import atendimentoController from '../models/atendimento.js';
const router = express.Router();


router.post('/createAtendimentos', atendimentoController.createAtendimento);
router.get('/allAtendimento', atendimentoController.getAllAtendimentos);
router.put('/editAtendimento', atendimentoController.updateAtendimento);
router.delete('/deleteAtendimento', atendimentoController.deleteAtendimento);

export default router;