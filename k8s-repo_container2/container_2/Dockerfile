FROM node:alpine

RUN mkdir -p /usr/kazi_PV__dir

WORKDIR /usr/kazi_PV__dir

COPY package.json /usr/kazi_PV__dir

RUN npm install

COPY . /usr/kazi_PV__dir


CMD npm start