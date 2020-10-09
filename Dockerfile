FROM node:12.19.0
RUN apt-get update
RUN npm install -g gatsby-cli
WORKDIR /naoty.dev
COPY package.json package-lock.json /naoty.dev/
RUN npm install
COPY . /naoty.dev/
CMD ["npm", "start"]
