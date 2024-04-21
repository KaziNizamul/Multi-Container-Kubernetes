FROM node:alpine

RUN mkdir -p /usr/kazi_PV_dir


WORKDIR /usr/kazi_PV_dir


COPY package.json /usr/kazi_PV_dir

RUN npm install

COPY . /usr/kazi_PV_dir

CMD npm start