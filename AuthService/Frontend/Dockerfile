# Base image
FROM node:21 as base
WORKDIR /usr/src/app
SHELL ["/bin/bash", "-c"]

# Install Bun
FROM base as bun
RUN curl -fsSL https://bun.sh/install | bash
RUN mv /root/.bun/bin/bun /usr/local/bin/bun

# Setup arguments for environment-specific configurations
ARG BUILD_ENV=development
ENV NODE_ENV=${BUILD_ENV}

# Install all dependencies including devDependencies
FROM bun AS dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Prerelease stage for building and/or other pre-run steps
FROM dependencies AS build
COPY . .
RUN bun run build

# Final stage: Copy only necessary files and production dependencies
FROM bun AS release
COPY --from=build /usr/src/app/dist /usr/src/app/dist
# Optionally, if you need node_modules in production, copy them as well:
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY package.json bun.lockb vite.config.ts ./

# Set NODE_ENV to production for the final image
ENV NODE_ENV=production
# Install only production dependencies
RUN bun install --frozen-lockfile --production

EXPOSE 8005/tcp
ENTRYPOINT [ "bun" ]
CMD [ "run", "dev" ]

# In production, ensure the CMD is appropriate for your app, e.g., serving a built application
