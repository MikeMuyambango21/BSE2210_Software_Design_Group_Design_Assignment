#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy || npx prisma migrate dev --name init --skip-generate || true

echo "Generating Prisma Client..."
npx prisma generate

echo "Starting server..."
exec npm run dev
