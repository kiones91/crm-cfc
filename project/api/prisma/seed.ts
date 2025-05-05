import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@autoescola.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@autoescola.com',
      password: passwordHash,
      role: 'admin',
    },
  });

  console.log('Usuário admin criado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
