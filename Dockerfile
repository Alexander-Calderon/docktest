FROM node:20

# Create app directory
WORKDIR /data/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

# Bundle app source
COPY . /data

#RUN npm install && npm run start
# If you are building your code for production
# RUN npm ci --omit=dev



EXPOSE 8080
#CMD [ "node", "/data/src/index.js" ]

#CMD ["npm", "install", "&&", "npm", "run", "start", "&&", "tail", "-f", "/dev/null"]
CMD [ "tail", "-f", "/dev/null" ]
