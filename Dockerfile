# 1) Build frontend assets
FROM node:22-alpine AS nodebuild
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# 2) PHP runtime
FROM php:8.3-cli-alpine

# PHP extensions (Laravel için temel)
RUN apk add --no-cache \
    bash curl git unzip icu-dev oniguruma-dev libzip-dev \
    && docker-php-ext-install intl mbstring zip pdo pdo_mysql

WORKDIR /var/www/html
COPY . .

# Vite build çıktısını public/build içine kopyala
COPY --from=nodebuild /app/public/build /var/www/html/public/build

# Laravel için izinler
RUN mkdir -p storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

ENV PORT=10000
EXPOSE 10000

# Render PORT'u environment olarak verir
CMD ["sh", "-lc", "php -S 0.0.0.0:$PORT -t public"]
