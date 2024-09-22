FROM node:lts AS dist
COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build:prod

FROM node:lts AS node_modules
COPY package.json ./

RUN npm install --prod

FROM node:lts

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]


# FROM node:14.16.0-alpine3.13

# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER app

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . ./

# EXPOSE 3900

# CMD ["npm", "start"]