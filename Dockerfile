FROM registry.sovcombank.group/project-cache/library/node:18.9.1
ARG TUNNEL
RUN npm config set registry=https://nexus.sovcombank.group/repository/npm-proxy always-auth=true strict-ssl=false proxy ${TUNNEL}
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .