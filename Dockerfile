FROM node:20-alpine 
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the React app
RUN npm run build
# Expose port 8000
EXPOSE 8000
# Start nginx
CMD ["node", "dist/index.js"]