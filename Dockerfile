FROM node:lts-alpine3.10

LABEL com.centurylinklabs.watchtower.enable=true

WORKDIR /usr/src/app

COPY ./out/ .
COPY package.json .

RUN npm install

EXPOSE 8085

CMD [ "node", "index.js" ]
