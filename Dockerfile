# Use a base image that includes build tools
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN apk add --no-cache --virtual .gyp python3 make g++ && \
    npm install && \
    apk del .gyp

# Copy all folders and files in the directory
COPY . .

# build Next.js application
RUN npm run build

# Use a slimmer image for the final image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy built node modules and server files from the builder stage
COPY --from=builder /usr/src/app .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
# CMD ["sh"]
CMD ["npm", "start"]