# Install dependencies only when needed
FROM node:16-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat libpng-dev libtool g++ make zlib-dev \
    && rm -fr /var/cache/apk/*
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
