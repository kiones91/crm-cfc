import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllExams = async (req: Request, res: Response) => {
  const exams = await prisma.exam.findMany({ include: { student: true, instructor: true, vehicle: true } });
  res.json(exams);
};

export const getExamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const exam = await prisma.exam.findUnique({
    where: { id },
    include: { student: true, instructor: true, vehicle: true },
  });
  if (!exam) return res.status(404).json({ message: 'Exame não encontrado' });
  res.json(exam);
};

export const createExam = async (req: Request, res: Response) => {
  const { studentId, instructorId, vehicleId, date, result } = req.body;
  try {
    const exam = await prisma.exam.create({
      data: { studentId, instructorId, vehicleId, date: new Date(date), result },
    });
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar exame', details: err });
  }
};

export const updateExam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { studentId, instructorId, vehicleId, date, result } = req.body;
  try {
    const exam = await prisma.exam.update({
      where: { id },
      data: { studentId, instructorId, vehicleId, date: new Date(date), result },
    });
    res.json(exam);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar exame', details: err });
  }
};

export const deleteExam = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.exam.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar exame', details: err });
  }
};
