# =========================
# 1) Frontend build (Vite)
# =========================
FROM node:22-alpine AS nodebuild
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# =========================
# 2) PHP + Composer
# =========================
FROM php:8.3-cli-alpine

# Sistem paketleri + PHP extension'lar
RUN apk add --no-cache \
    bash curl git unzip icu-dev oniguruma-dev libzip-dev \
    && docker-php-ext-install intl mbstring zip pdo pdo_mysql

# Composer kur
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Laravel dosyaları
COPY . .

# Composer install (İŞTE EKSİK OLAN BU)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Vite build çıktısını kopyala
COPY --from=nodebuild /app/public/build /var/www/html/public/build

# Laravel izinler
RUN mkdir -p storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

ENV PORT=10000
EXPOSE 10000

CMD ["sh", "-lc", "php -S 0.0.0.0:$PORT -t public"]
