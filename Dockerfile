### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:lts as builder
COPY package.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i --force && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN node $(npm bin)/ng build --prod --output-path=dist --verbose

#node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod


### STAGE 2: Setup ###
FROM nginx:stable

## Override nginx config to serve SPA
COPY --from=builder /ng-app/nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html
