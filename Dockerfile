ARG NODE_VERSION=16
# specify the node base image with your desired version node:<version>
FROM node:${NODE_VERSION}-alpine
# replace this with your application's default port

RUN mkdir -p /code

WORKDIR /code

COPY package.json package.json

RUN yarn install --production

COPY . /code/

CMD [ "yarn", "prod" ]