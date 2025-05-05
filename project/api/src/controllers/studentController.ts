// src/controllers/studentController.ts atualizado
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllStudents = async (req: Request, res: Response) => {
  const students = await prisma.student.findMany();
  res.json(students);
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json(student);
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await prisma.student.create({ data: req.body });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar aluno', details: err });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.update({ where: { id }, data: req.body });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar aluno', details: err });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar aluno', details: err });
  }
};
