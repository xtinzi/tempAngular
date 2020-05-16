#Specify base image
FROM node:alpine

WORKDIR /usr/app/src/client

#Install client dependencies
#COPY ./client/package.json ./ 
COPY ./client ./
RUN npm install
#COPY ./client ./

WORKDIR /usr/app/src

#Install server dependencies
#COPY ./package.json ./ 
COPY ./ ./ 
RUN npm install
#COPY ./ ./ 

EXPOSE 5000

# Default command
CMD ["npm", "start"]