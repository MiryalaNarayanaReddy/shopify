FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm install -g typescript

# Build app

RUN tsc -b 

# Run app
CMD ["npm", "start"]