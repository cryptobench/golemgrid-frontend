FROM node:lts-alpine as build
WORKDIR /app
RUN mkdir /crawler
COPY ./package.json /app/package.json
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN npm install
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.19.9-alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
