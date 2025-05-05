import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllVehicles = async (req: Request, res: Response) => {
  const vehicles = await prisma.vehicle.findMany();
  res.json(vehicles);
};

export const getVehicleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) return res.status(404).json({ message: 'Veículo não encontrado' });
  res.json(vehicle);
};

export const createVehicle = async (req: Request, res: Response) => {
  const { plate, model, brand, year } = req.body;
  try {
    const vehicle = await prisma.vehicle.create({ data: { plate, model, brand, year } });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar veículo', details: err });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { plate, model, brand, year } = req.body;
  try {
    const vehicle = await prisma.vehicle.update({ where: { id }, data: { plate, model, brand, year } });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar veículo', details: err });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.vehicle.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao deletar veículo', details: err });
  }
};
