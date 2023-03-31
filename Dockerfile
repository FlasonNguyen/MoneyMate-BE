# Common build stage

FROM node:18-alpine3.15 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 1511

# Development build stage
FROM common-build-stage as development-build-stage

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT [ "docker-entrypoint.sh" ]

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
