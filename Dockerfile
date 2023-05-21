FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

ENV TZ=America/Sao_Paulo

COPY . .