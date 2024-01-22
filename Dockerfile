# Builder stage
ARG NODE_VERSION=16
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine as builder

WORKDIR /code

# Set timezone
ENV TZ=Asia/Hong_Kong

# Copy package.json and yarn.lock files
COPY package.json yarn.lock /code/

# Install dependencies
RUN yarn install --production

# Copy the rest of your application's code
COPY . /code/

# Build your application
RUN yarn build

# Final stage
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine

# Create a user and set file permissions
RUN mkdir -p /code && \
    adduser -D --uid 10000 runner && \
    chown -R runner /code

# Set non-root user
USER 10000

# Set working directory and timezone
WORKDIR /code
ENV TZ=Asia/Hong_Kong

# Copy built node modules and build artifacts from the builder stage
COPY --from=builder /code/node_modules /code/node_modules
COPY --from=builder /code/package.json /code/package.json
COPY --from=builder /code/.next /code/.next

# Copy other necessary files here if needed
# COPY --from=builder /code/other-files /code/other-files

CMD ["yarn", "start"]
