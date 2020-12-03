FROM node:14.15.1-alpine
ENV REACT_APP_SVC_HOSTNAME=autocomplete-svc
WORKDIR /client
COPY package.json package-lock.json yarn.lock ./
RUN npm install
COPY . ./
CMD ["npm", "run", "start"]
