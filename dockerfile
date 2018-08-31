FROM node:8
WORKDIR /usr/src/sisGo
COPY package*.json ./
RUN npm install
RUN npm install -g gulp-cli
CMD [ "gulp", "pro" ]