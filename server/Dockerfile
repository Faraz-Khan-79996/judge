# Use the official Node.js image as a base image
FROM node:16

# Install GCC
RUN apt-get update && apt-get install -y gcc

# Create a directory for the Node.js server code
WORKDIR /app

# Copy the Node.js server code into the container
COPY . .

# Install the dependencies
RUN npm install

# Expose the necessary ports
EXPOSE 3000

# Start the Node.js server
CMD node index.js
