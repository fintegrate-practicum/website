 #!/usr/bin/env sh

FROM node:18

WORKDIR /app


COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./


COPY . .


RUN npm install


# RUN npm run build

EXPOSE 5173 

CMD [ "npm", "run","dev" ]