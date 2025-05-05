import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import instructorRoutes from './routes/instructorRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import lessonRoutes from './routes/lessonRoutes';
import examRoutes from './routes/examRoutes';


dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/instructors', instructorRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/lessons', lessonRoutes);
app.use('/exams', examRoutes);

app.get('/', (req, res) => {
  res.send('AutoEscola CRM API rodando!');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));