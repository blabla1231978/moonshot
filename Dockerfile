FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ormconfig.json ./dist/

EXPOSE 3000

CMD [ "npm", "run", "start" ]
