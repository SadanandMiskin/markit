FROM oven/bun

WORKDIR /app

COPY ./server ./server
WORKDIR /app/server
RUN bun install
RUN bun run b


WORKDIR /app
COPY ./frontend ./frontend
WORKDIR /app/frontend
RUN bun install
RUN bun b

WORKDIR /app/server
EXPOSE 3000
CMD [ "bun" , "prod/index.js" ]

