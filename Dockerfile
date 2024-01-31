FROM node:19
WORKDIR /Users/colorcodedlabs/repos/dividine/

CMD [ "npx", "nodemon", "index.js" ]

COPY package*.json /Users/colorcodedlabs/repos/dividine/
RUN npm install

COPY . /Users/colorcodedlabs/repos/dividine/