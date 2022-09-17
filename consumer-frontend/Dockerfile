FROM node:current-alpine3.15

ENV PYTHONUNBUFFERED=1

RUN apk add --no-cache bash \ 
  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk \
  && apk --no-cache add glibc-2.29-r0.apk \
  && rm -rf /var/cache/apk/* \ 
  && apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python \
  && python3 -m ensurepip \
  && pip3 install --no-cache --upgrade pip setuptools 


WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
