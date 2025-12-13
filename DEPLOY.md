# 🚀 Руководство по деплою TechHub на сервер

Полное пошаговое руководство по развертыванию приложения TechHub на production сервер.

---

## 📋 Содержание

1. [Подготовка сервера](#1-подготовка-сервера)
2. [Установка Docker](#2-установка-docker)
3. [Клонирование проекта](#3-клонирование-проекта)
4. [Настройка переменных окружения](#4-настройка-переменных-окружения)
5. [Настройка docker-compose для production](#5-настройка-docker-compose-для-production)
6. [Запуск приложения](#6-запуск-приложения)
7. [Настройка Nginx](#7-настройка-nginx)
8. [Настройка SSL (HTTPS)](#8-настройка-ssl-https)
9. [Настройка Firewall](#9-настройка-firewall)
10. [Мониторинг и логи](#10-мониторинг-и-логи)
11. [Резервное копирование](#11-резервное-копирование)

---

## 1. Подготовка сервера

### Требования к серверу:

- **ОС:** Ubuntu 20.04+ или Debian 11+
- **RAM:** Минимум 2GB (рекомендуется 4GB+)
- **CPU:** 2+ ядра
- **Диск:** 20GB+ свободного места
- **Доступ:** SSH доступ с root или sudo правами

### Подключение к серверу:

```bash
ssh root@your-server-ip
# или
ssh user@your-server-ip
```

---

## 2. Установка Docker

### Обновление системы:

```bash
sudo apt update
sudo apt upgrade -y
```

### Установка Docker:

```bash
# Удалите старые версии (если есть)
sudo apt remove docker docker-engine docker.io containerd runc -y

# Установите зависимости
sudo apt install ca-certificates curl gnupg lsb-release -y

# Добавьте официальный GPG ключ Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Добавьте репозиторий Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установите Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Проверьте установку
docker --version
docker compose version
```

### Настройка Docker:

```bash
# Добавьте пользователя в группу docker (если не root)
sudo usermod -aG docker $USER
newgrp docker

# Проверьте, что Docker работает
sudo systemctl status docker
sudo systemctl enable docker
```

---

## 3. Клонирование проекта

### Установка Git:

```bash
sudo apt install git -y
```

### Клонирование репозитория:

```bash
# Перейдите в домашнюю директорию или создайте директорию для проектов
cd ~
mkdir projects
cd projects

# Клонируйте репозиторий
git clone <your-repo-url> TechHub
cd TechHub
```

**Или загрузите проект через SCP:**

```bash
# С вашего локального компьютера
scp -r /path/to/TechHub user@server-ip:/home/user/
```

---

## 4. Настройка переменных окружения

### Создание .env файла:

```bash
cd ~/projects/TechHub  # или путь к вашему проекту
nano .env
```

### Содержимое .env файла:

```env
# MongoDB Connection
MONGO_URL=mongodb://mongodb:27017/techhub

# JWT Secret Key (ОБЯЗАТЕЛЬНО замените на случайный ключ!)
# Генерируйте через: openssl rand -base64 32
JWT_SECRET=your-super-secret-random-key-minimum-32-characters-long

# Server Port (внутри контейнера)
PORT=5000

# Environment
NODE_ENV=production
```

### Генерация безопасного JWT_SECRET:

```bash
# Сгенерируйте случайный ключ
openssl rand -base64 32

# Скопируйте результат в JWT_SECRET в .env файле
```

**Важно:** Никогда не коммитьте `.env` файл в Git!

---

## 5. Настройка docker-compose для production

### Обновите docker-compose.yml:

```bash
nano docker-compose.yml
```

### Измените frontend environment:

```yaml
frontend:
  environment:
    - VITE_API_URL=https://api.yourdomain.com # Замените на ваш домен
    # или
    - VITE_API_URL=http://your-server-ip:5001 # Если без домена
```

### Рекомендуемые настройки для production:

```yaml
services:
  mongodb:
    restart: always
    # Добавьте ограничения ресурсов
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M

  backend:
    restart: always
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M

  frontend:
    restart: always
    deploy:
      resources:
        limits:
          memory: 256M
        reservations:
          memory: 128M
```

---

## 6. Запуск приложения

### Первый запуск:

```bash
# Перейдите в директорию проекта
cd ~/projects/TechHub

# Запустите контейнеры
docker compose up -d --build

# Проверьте статус
docker compose ps

# Посмотрите логи
docker compose logs -f
```

### Заполнение базы данных (если нужно):

```bash
# Если у вас есть seed.js файл
docker compose exec backend node seed.js
```

### Проверка работы:

```bash
# Проверьте, что все контейнеры запущены
docker compose ps

# Проверьте доступность API
curl http://localhost:5001/api/products

# Проверьте frontend
curl http://localhost
```

---

## 7. Настройка Nginx

### Установка Nginx:

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Создание конфигурации:

```bash
sudo nano /etc/nginx/sites-available/techhub
```

### Конфигурация для Nginx:

```nginx
# Frontend и Backend на одном домене
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Увеличение размера загружаемых файлов (если нужно)
    client_max_body_size 10M;
}
```

**Или отдельные домены:**

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Активация конфигурации:

```bash
# Создайте символическую ссылку
sudo ln -s /etc/nginx/sites-available/techhub /etc/nginx/sites-enabled/

# Удалите дефолтную конфигурацию (опционально)
sudo rm /etc/nginx/sites-enabled/default

# Проверьте конфигурацию
sudo nginx -t

# Перезапустите Nginx
sudo systemctl restart nginx
```

---

## 8. Настройка SSL (HTTPS)

### Установка Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Получение SSL сертификата:

```bash
# Для одного домена
sudo certbot --nginx -d yourdomain.com

# Для нескольких доменов
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

### Автоматическое обновление:

```bash
# Проверьте автоматическое обновление
sudo certbot renew --dry-run

# Certbot автоматически настроит cron для обновления
```

### Обновление конфигурации Nginx (автоматически):

Certbot автоматически обновит конфигурацию Nginx для использования HTTPS.

---

## 9. Настройка Firewall

### Настройка UFW (Uncomplicated Firewall):

```bash
# Разрешите SSH (ВАЖНО! Сделайте это первым!)
sudo ufw allow 22/tcp

# Разрешите HTTP и HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Включите firewall
sudo ufw enable

# Проверьте статус
sudo ufw status
```

### Если используете другой firewall:

**iptables:**

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -j DROP
```

---

## 10. Мониторинг и логи

### Просмотр логов Docker:

```bash
# Все сервисы
docker compose logs -f

# Конкретный сервис
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb

# Последние 100 строк
docker compose logs --tail=100 backend
```

### Настройка ротации логов:

```bash
# Создайте конфигурацию для Docker
sudo nano /etc/docker/daemon.json
```

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

```bash
sudo systemctl restart docker
```

### Мониторинг ресурсов:

```bash
# Использование ресурсов контейнерами
docker stats

# Использование диска
df -h
docker system df
```

---

## 11. Резервное копирование

### Резервное копирование базы данных:

```bash
# Создайте скрипт для бэкапа
nano ~/backup-mongodb.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="techhub_backup_$DATE"

mkdir -p $BACKUP_DIR

# Создайте бэкап
docker compose exec -T mongodb mongodump --archive --db=techhub > $BACKUP_DIR/$BACKUP_NAME.archive

# Удалите старые бэкапы (старше 7 дней)
find $BACKUP_DIR -name "techhub_backup_*.archive" -mtime +7 -delete

echo "Backup created: $BACKUP_NAME.archive"
```

```bash
# Сделайте скрипт исполняемым
chmod +x ~/backup-mongodb.sh

# Добавьте в cron (ежедневно в 2:00)
crontab -e
# Добавьте строку:
0 2 * * * /home/user/backup-mongodb.sh
```

### Восстановление из бэкапа:

```bash
# Восстановите базу данных
docker compose exec -T mongodb mongorestore --archive --db=techhub < /path/to/backup.archive
```

---

## 🔄 Обновление приложения

### Процесс обновления:

```bash
# 1. Остановите приложение
docker compose down

# 2. Получите последние изменения
git pull origin main

# 3. Пересоберите и запустите
docker compose up -d --build

# 4. Проверьте логи
docker compose logs -f
```

---

## 🛡️ Безопасность

### Рекомендации:

1. **Используйте сильные пароли** для всех аккаунтов
2. **Регулярно обновляйте систему:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
3. **Используйте SSH ключи** вместо паролей
4. **Настройте fail2ban** для защиты от брутфорса
5. **Регулярно делайте бэкапы**
6. **Мониторьте логи** на подозрительную активность

### Установка fail2ban:

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 📞 Поддержка

При возникновении проблем:

1. Проверьте логи: `docker compose logs -f`
2. Проверьте статус контейнеров: `docker compose ps`
3. Проверьте конфигурацию Nginx: `sudo nginx -t`
4. Проверьте firewall: `sudo ufw status`

---

**Успешного деплоя! 🚀**
