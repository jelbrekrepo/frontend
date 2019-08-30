FROM node:12-alpine
MAINTAINER seth@sethstephens.me
WORKDIR /usr/src/app

COPY . .
RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start:prod"]