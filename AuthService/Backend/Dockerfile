# Base image
FROM node:21 as base
WORKDIR /usr/src/app
SHELL ["/bin/bash", "-c"]

# Install bun
FROM base as bun
RUN curl -fsSL https://bun.sh/install | bash
RUN mv /root/.bun/bin/bun /usr/local/bin/bun

# Setup arguments for environment-specific configurations
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies (conditionally on NODE_ENV)
FROM bun AS dependencies
COPY package.json bun.lockb ./
RUN if [ "$NODE_ENV" = "development" ]; \
    then bun install --frozen-lockfile; \
    else bun install --frozen-lockfile --production; \
    fi

# Prerelease stage for building and/or other pre-run steps
FROM bun AS prerelease
COPY --from=dependencies /usr/src/app/node_modules node_modules
COPY . .
RUN if [ "$NODE_ENV" = "production" ]; \
    then bun prisma generate && bun run build; \
    else bun prisma generate; \
    fi

# Final stage
FROM bun AS release
COPY --from=prerelease /usr/src/app/ .
EXPOSE 3000/tcp
ENTRYPOINT [ "bun" ]
CMD [ "run", "dev" ]

# In production, override the CMD with:
# CMD ["run", "start"]
