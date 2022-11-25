FROM registry.sovcombank.group/project-cache/library/node:18.9.1
ARG TUNNEL
RUN npm config set registry=https://nexus.sovcombank.group/repository/npm-proxy always-auth=true strict-ssl=false proxy ${TUNNEL}
WORKDIR /app
COPY package.json .
COPY . .