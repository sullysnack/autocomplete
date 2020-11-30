FROM node:14.15.1-alpine
WORKDIR /svc
COPY package.json package-lock.json ./
RUN yarn install
COPY . ./
CMD ["yarn", "start"]
