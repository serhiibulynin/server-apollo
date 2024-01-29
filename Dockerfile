FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:16-alpine as builder
ENV NODE_ENV=development
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:16-alpine as runner
ENV NODE_ENV=development
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# for migrations
COPY --from=builder /app/.sequelizerc ./

EXPOSE 4000

# ln -s ./dist ./src - for migrations
CMD sh -c "ln -s ./dist ./src && npm run db:migrate && npm run db:seed && npm run serve"