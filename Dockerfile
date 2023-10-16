	# Use the official Node.js 14 image as the base image
FROM node:18-alpine
 
# Set the working directory in the container
WORKDIR /app
 
# Copy the package.json and yarn.lock files to the working directory
COPY pnpm-lock.yaml ./
 
# Install the dependencies using yarn
RUN npm i -g pnpm \
		pnpm install
 
# Copy the rest of the application code to the working directory
COPY . .
 
# Build the TypeScript code
RUN pnpm run build
 
# Set the environment variables
ENV PORT=4011
ENV NODE_ENV=production
 
# Expose the port on which the server will listen
EXPOSE $PORT
 
# Start the server
CMD ["node", "dist/index.js"]

# Add labels for better maintainability
LABEL maintainer="KINESS-BE"
LABEL version="1.0"
LABEL description="Node.js TypeScript web server Docker image"