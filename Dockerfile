FROM node:14.15.1-alpine
WORKDIR /svc
COPY package.json package-lock.json yarn.lock ./
RUN yarn install
COPY . ./
CMD ["yarn", "start"]