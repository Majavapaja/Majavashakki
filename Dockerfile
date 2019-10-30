FROM node:10.17.0-buster

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

COPY . /app
RUN npm run build

RUN which npm
ENTRYPOINT [ "/usr/local/bin/node", "app.js" ]
