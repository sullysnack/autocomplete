FROM node:14.15.1-alpine
WORKDIR /svc
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 9000
CMD ["npm", "run", "start"]
