FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN chown -R node:node /app
USER node

FROM builder AS build
RUN npm run build

FROM nginx:alpine AS runner

RUN sed -i 's/listen\s*80/listen 8080/g' /etc/nginx/conf.d/default.conf && \
    sed -i 's/listen\s*\[::\]:80/listen [::]:8080/g' /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/cache/nginx /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown -R nginx:nginx /run

COPY --chown=nginx:nginx --from=build /app/dist /usr/share/nginx/html

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]