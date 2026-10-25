# Use the official lightweight Node.js 22 image.
FROM node:22.23.4-slim

# Enable corepack for pnpm
RUN corepack enable

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package.json pnpm-lock.yaml ./

# Install production dependencies.
RUN pnpm install --frozen-lockfile --prod

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "node", "index.js" ]
