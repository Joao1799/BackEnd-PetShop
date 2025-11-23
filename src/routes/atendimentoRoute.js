import express from 'express';
import atendimentoController from '../models/atendimento.js';
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router();


router.post('/createAtendimentos',verifyToken, atendimentoController.createAtendimento);
router.get('/allAtendimento',verifyToken, atendimentoController.getAllAtendimentos);
router.put('/editAtendimento',verifyToken, atendimentoController.updateAtendimento);
router.delete('/deleteAtendimento',verifyToken, atendimentoController.deleteAtendimento);

export default router;