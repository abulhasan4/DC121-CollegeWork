FROM node:latest
RUN mkdir /app
WORKDIR /app
RUN npm install express
RUN npm install redis-node
RUN npm install coffeescript
CMD ["node", "app.js"]
EXPOSE 8000
COPY app.js .
