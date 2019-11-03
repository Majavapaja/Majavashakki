FROM node:10.17.0-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY . /app
RUN npm run build

RUN npm prune --production

FROM node:10.17.0-alpine
WORKDIR /app

ENV NODE_ENV=prod
COPY --from=0 /app .

ENTRYPOINT [ "/usr/local/bin/node", "app.js" ]
