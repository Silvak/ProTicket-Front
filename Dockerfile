# Build
FROM node:18-alpine AS builder
WORKDIR /app

# COPY .env .env
COPY package.json package-lock.json ./

RUN npm install
COPY . .

RUN npm run build

# Runtime
FROM node:18-alpine AS production
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist


EXPOSE 4000
CMD ["serve", "-s", "dist", "-l", "4000"]