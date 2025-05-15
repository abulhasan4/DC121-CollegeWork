FROM node:latest
RUN mkdir /app
WORKDIR /app
RUN npm install express
RUN npm install -g nodemon
CMD ["nodemon", "node", "app.js"]
EXPOSE 80

# We put this *last*, because this is the element of this configuration
# most likely to change.
COPY app.js .
