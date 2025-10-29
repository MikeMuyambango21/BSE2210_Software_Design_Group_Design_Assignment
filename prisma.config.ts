// Load environment variables from .env
import 'dotenv/config';

// Export Prisma configuration
export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url: process.env.DATABASE_URL,
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment');
}
