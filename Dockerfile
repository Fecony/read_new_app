FROM node:alpine

ARG VITE_PORT

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE $VITE_PORT

CMD ["yarn", "run", "dev"]