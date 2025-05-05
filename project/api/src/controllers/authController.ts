import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';

const prisma = new PrismaClient();

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) return res.status(401).json({ message: 'Senha incorreta' });

  const token = jwt.sign({ id: user.id, role: user.role }, authConfig.jwt.secret, {
    expiresIn: authConfig.jwt.expiresIn,
  });

  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}
