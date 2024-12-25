# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the backend package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy all backend files into the container
COPY . ./

# Expose the port your server will run on
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
