import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@autoescola.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@autoescola.com',
      password: passwordHash,
      role: 'admin',
    },
  });

  console.log('Usuário criado:', user);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
