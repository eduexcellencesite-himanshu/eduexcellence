# syntax=docker/dockerfile:1
# API image for Google Cloud Run. Build from the repository root:
#   docker build -f apps/api/Dockerfile .
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json .npmrc ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY apps/docs/package.json apps/docs/
COPY packages ./packages
RUN npm ci --workspace=api --omit=dev --ignore-scripts
COPY apps/api ./apps/api
WORKDIR /app/apps/api
USER node
# Cloud Run sets PORT (8080); server.js listens on it.
CMD ["node", "server.js"]
