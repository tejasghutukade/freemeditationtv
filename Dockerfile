# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-slim
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/server.js .
COPY package*.json ./
RUN npm install --production

# Set production environment
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"] 