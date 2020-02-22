FROM node:12.16.1
RUN apt-get update
WORKDIR /naoty.dev
COPY . /naoty.dev/
