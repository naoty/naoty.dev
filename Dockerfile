FROM node:12.16.1
RUN apt-get update
RUN npm install -g gatsby-cli
WORKDIR /naoty.dev
COPY . /naoty.dev/
