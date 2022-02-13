# NGINX reverse proxy setup guide
## Notes
Website uses built in **node** http server (for more information see nuxt/nitro docs), this server can also be used standalone, but it's recommended to hide it behind **nginx** or other reverse-proxy

Website used with reverse-proxy should not listen to public ip address, use internal local addresses (127.0.0.1 for example).

*To save file and close nano editor* press **CTRL+X** than **SHIFT+Y** than **ENTER**

## Setup
Required OS: **ubuntu 20.04+**

Recommended OS: **ubuntu 20.04.3 LTS**

Required Software:
1. [nginx 1.18.0+](https://nginx.org/en/)

## Update packges

```bash
sudo apt update
sudo apt install nginx
```

# Edit website configuration
```bash
# create website configuration file with command below
sudo nano /etc/nginx/sites-available/veil.tools
# add this content
# veil.tools used as example, change it to domain that will be used for website
server {
        listen 80;
        listen [::]:80;

        access_log off;
        error_log /var/log/nginx/veiltools-error.log;

        server_name veil.tools www.veil.tools;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $http_connection;
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}
```


## Edit nginx configuration
```bash
# open nginx config
sudo nano /etc/nginx/nginx.conf
# change next parameters
worker_rlimit_nofile 65535;

events {
    multi_accept       on;
    worker_connections 65535;
}

http {
    sendfile               on;
    tcp_nopush             on;
    tcp_nodelay            on;
    server_tokens          off;
    log_not_found          off;
    types_hash_max_size    2048;
    types_hash_bucket_size 64;
    client_max_body_size   16M;
    access_log off;
    server_names_hash_bucket_size 64;
    gzip off;
}
```

## Enable created configuration
```bash
sudo ln -s /etc/nginx/sites-available/veil.tools /etc/nginx/sites-enabled/
```

## Restart nginx
```bash
sudo systemctl restart nginx
```

Done, now website hidden behind **nginx** reverse-proxy