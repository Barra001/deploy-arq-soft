FROM node as builder
WORKDIR /usr/src/app
USER root
COPY package.json .
RUN npm i
COPY . .
RUN npm run build
FROM node:slim

USER node

WORKDIR /usr/src/app

USER root
COPY . .

RUN npm i

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "-r", "newrelic", "dist/index.js" ]