# Билдим клиента

FROM node:20 AS builder
WORKDIR /app
COPY ./client ./client
RUN cd client && npm ci && npm run build


# Билдим сервер 
FROM node:20
WORKDIR /app/server
COPY ./server/package*.json ./
RUN  npm ci --omit=dev 
COPY ./server ./
COPY --from=builder /app/client/dist ./dist

EXPOSE 3005

CMD ["node", "index.js"]


