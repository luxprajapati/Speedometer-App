# Use the official Node.js image for React build
FROM node:20 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for frontend dependencies
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend files into the container

COPY public/ ./public
COPY src/ ./src

# Build the React app for production
RUN npm run build

# Serve the app using nginx
FROM nginx:alpine

# Copy the build folder to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
