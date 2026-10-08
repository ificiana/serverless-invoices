# docker build . -t ificiana/serverless-invoices
# docker run -p 80:8080 -d ificiana/serverless-invoices

FROM node:lts

RUN corepack enable && npm install -g http-server

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 8080

CMD ["http-server", "dist"]
