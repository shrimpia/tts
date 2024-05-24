FROM node:18.20.3-bullseye-slim
WORKDIR /app

RUN apt update %% apt upgrade -y
RUN apt upgrade -y
RUN apt install -y \
    python3 \
    git \
		make \
		libtool-bin \
    libsodium23 \
    ffmpeg
RUN ln -s /usr/bin/python3 /usr/bin/python

RUN corepack enable pnpm
RUN npm install -g node-gyp

COPY . .
RUN pnpm install

USER node

ENTRYPOINT ["pnpm", "start"]
