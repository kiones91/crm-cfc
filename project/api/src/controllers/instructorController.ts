import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllInstructors = async (req: Request, res: Response) => {
  const instructors = await prisma.instructor.findMany();
  res.json(instructors);
};

export const getInstructorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const instructor = await prisma.instructor.findUnique({ where: { id } });
  if (!instructor) return res.status(404).json({ message: 'Instrutor não encontrado' });
  res.json(instructor);
};

export const createInstructor = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  try {
    const instructor = await prisma.instructor.create({ data: { name, email, phone } });
    res.status(201).json(instructor);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar instrutor', details: err });
  }
};

export const updateInstructor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const instructor = await prisma.instructor.update({ where: { id }, data: { name, email, phone } });
    res.json(instructor);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar instrutor', details: err });
  }
};

export const deleteInstructor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.instructor.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar instrutor', details: err });
  }
};
