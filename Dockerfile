ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /code

RUN adduser -D --uid 10000 runner

# set timezone to hk, for reference (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
ENV TZ=Asia/Hong_Kong

WORKDIR /code

COPY package.json /code
COPY yarn.lock /code

RUN yarn install --production

COPY . /code/

RUN yarn build

RUN rm .env

USER 10000

CMD [ "yarn", "start" ]