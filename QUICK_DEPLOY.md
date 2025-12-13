# ⚡ Быстрый деплой TechHub

Краткая инструкция для быстрого развертывания на сервере.

## 🚀 Быстрый старт (5 минут)

```bash
# 1. Подключитесь к серверу
ssh user@your-server-ip

# 2. Установите Docker
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
sudo usermod -aG docker $USER && newgrp docker

# 3. Клонируйте проект
git clone <your-repo-url> TechHub && cd TechHub

# 4. Создайте .env файл
cat > .env << EOF
MONGO_URL=mongodb://mongodb:27017/techhub
JWT_SECRET=$(openssl rand -base64 32)
PORT=5000
NODE_ENV=production
EOF

# 5. Запустите приложение
docker compose up -d --build

# 6. Проверьте статус
docker compose ps
```

## 🌐 Настройка домена (опционально)

```bash
# Установите Nginx
sudo apt install nginx -y

# Создайте конфигурацию
sudo nano /etc/nginx/sites-available/techhub
```

Вставьте:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
    }

    location /api {
        proxy_pass http://localhost:5001;
        proxy_set_header Host $host;
    }
}
```

```bash
# Активируйте
sudo ln -s /etc/nginx/sites-available/techhub /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# SSL (HTTPS)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## 🔥 Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## ✅ Готово!

Откройте: `http://your-server-ip` или `https://yourdomain.com`

---

**Подробная инструкция:** См. [DEPLOY.md](./DEPLOY.md)
