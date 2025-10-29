FROM node:18-alpine

WORKDIR /app

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Copy entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

# Use entrypoint script
ENTRYPOINT ["/app/docker-entrypoint.sh"]