FROM node:14.15.1-alpine
WORKDIR /client
COPY package.json package-lock.json yarn.lock ./
RUN yarn install
COPY . ./
CMD ["yarn", "start"]
