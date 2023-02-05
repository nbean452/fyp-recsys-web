ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /code

RUN adduser --uid 10000 runner
USER 10000

WORKDIR /code

COPY package.json /code
COPY yarn.lock /code

RUN yarn install --production

COPY . /code/

RUN yarn build

CMD [ "yarn", "start" ]