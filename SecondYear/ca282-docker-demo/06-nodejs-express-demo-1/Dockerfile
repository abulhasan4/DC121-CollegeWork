FROM node:latest
RUN mkdir /app
WORKDIR /app
RUN npm install express
CMD ["node", "app.js"]
EXPOSE 80

# We put this *last*, because this is the element of this configuration
# most likely to change.  And when that happens, rebuilding the image
# requires fewer new layes.
COPY app.js .
