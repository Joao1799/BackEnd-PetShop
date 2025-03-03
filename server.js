import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

import userRouter from './src/routes/userRoute.js'; 
import petRoutes from './src/routes/petRoute.js';
import atendimentoRoutes from './src/routes/atendimentoRoute.js';
import userFuncRoutes from './src/routes/userFuncRoute.js'

app.use('/api', userRouter);
app.use('/api', petRoutes);
app.use('/api', atendimentoRoutes);
app.use('/api', userFuncRoutes);

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

startServer();
