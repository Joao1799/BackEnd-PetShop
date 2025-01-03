import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

import userRouter from './src/routes/userRoute.js'; 
import petRoutes from './src/routes/petRoute.js';
import atendimentoRoutes from './src/routes/atendimentoRoute.js';

app.use('/api', userRouter);
app.use('/api', petRoutes);
app.use('/api', atendimentoRoutes);

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Ocorreu um erro interno' });
});

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
