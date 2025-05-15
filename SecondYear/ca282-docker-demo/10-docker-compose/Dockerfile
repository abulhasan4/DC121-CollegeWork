FROM node:latest
RUN mkdir /app
WORKDIR /app
RUN npm install express
RUN npm install redis-node
RUN npm install coffeescript
CMD ["node", "app.js"]
EXPOSE 80
COPY app.js .
