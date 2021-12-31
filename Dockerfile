FROM node:latest

COPY index.js /app/index.js
COPY package*.json /app/
COPY views/* /app/views/

WORKDIR /app

RUN npm install

CMD ["node","index"]
