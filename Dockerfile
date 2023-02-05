ARG NODE_VERSION=16
# specify the node base image with your desired version node:<version>
FROM node:${NODE_VERSION}-alpine
# replace this with your application's default port

RUN adduser --uid 10000 runner
USER 10000

RUN mkdir -p /code

WORKDIR /code

COPY package.json /code
COPY yarn.lock /code

RUN yarn install --production

COPY . /code/

RUN yarn build

CMD [ "yarn", "start" ]