# Build Stage 1

FROM node:16.19.0-alpine AS appbuild

WORKDIR /usr/src/app

COPY package*.json ./

COPY babel.config.json ./

RUN npm install

COPY ./src ./src

RUN npm run build


# Build Stage 2

FROM node:16.19.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY babel.config.json ./

COPY .env ./

COPY ecosystem.config.js ./

RUN npm install

RUN npm install pm2 -g

COPY --from=appbuild /usr/src/app/dist ./dist

ENV TZ ASIA/SEOUL

ENV NODE_ENV production

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]