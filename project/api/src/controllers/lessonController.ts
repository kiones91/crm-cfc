import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllLessons = async (req: Request, res: Response) => {
  const lessons = await prisma.lesson.findMany({ include: { student: true, instructor: true, vehicle: true } });
  res.json(lessons);
};

export const getLessonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: { student: true, instructor: true, vehicle: true },
  });
  if (!lesson) return res.status(404).json({ message: 'Aula não encontrada' });
  res.json(lesson);
};

export const createLesson = async (req: Request, res: Response) => {
  const { studentId, instructorId, vehicleId, date, duration, type } = req.body;
  try {
    const lesson = await prisma.lesson.create({
      data: { studentId, instructorId, vehicleId, date: new Date(date), duration, type },
    });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar aula', details: err });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { studentId, instructorId, vehicleId, date, duration, type } = req.body;
  try {
    const lesson = await prisma.lesson.update({
      where: { id },
      data: { studentId, instructorId, vehicleId, date: new Date(date), duration, type },
    });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar aula', details: err });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.lesson.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar aula', details: err });
  }
};
