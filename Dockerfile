	# Use the official Node.js 14 image as the base image
FROM node:18
 
# Set the working directory in the container
WORKDIR /app
 
# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
 
# Install the dependencies
RUN npm install
 
# Copy the rest of the application code to the working directory
COPY . .
 
# Set environment variables for configuration
ENV PORT=4010
ENV NODE_ENV=production
 
# Expose the port on which the server will run
EXPOSE $PORT
 
# Start the server
CMD ["npm", "start"]

# Add labels for better maintainability
LABEL maintainer="KINESS-BE"
LABEL version="1.0"
LABEL description="Node.js TypeScript web server Docker image"