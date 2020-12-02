FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install required dependencies
RUN npm install -f

# Bundle app source
COPY . .

# Compile TypeScript code into Javascript
RUN npm run compile

# Run our compiled JavaScript using Node
CMD [ "node", "src/clank.js"]
