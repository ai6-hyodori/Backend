FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

ENV TZ ASIA/SEOUL

CMD ["npm", "run", "dev"]
