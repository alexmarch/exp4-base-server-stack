FROM node:10

WORKDIR /usr/src/app

RUN npm install -g yarn

ADD package.json ./
ADD yarn.lock ./

RUN yarn install

COPY app ./app
COPY test ./test

EXPOSE 5000
CMD [ "yarn", "start" ]