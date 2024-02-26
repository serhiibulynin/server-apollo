FROM node:18.15.0-alpine3.17 as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:18.15.0-alpine3.17 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:18.15.0-alpine3.17
COPY  --from=builder /app/node_modules ./app/node_modules
COPY  --from=builder /app/dist ./app/dist
COPY  --from=builder /app/database ./app/database
COPY  --from=builder /app/package.json ./app
COPY  --from=builder /app/.sequelizerc ./app

ENV PORT=3000
ENV NODE_ENV=production
WORKDIR /app
EXPOSE 3000
CMD sh -c "npm run db:migrate && npm run db:seed && npm run start:prod"