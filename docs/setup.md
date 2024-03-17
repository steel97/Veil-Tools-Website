# Veil.Tools setup guide
## Notes
*To save file and close nano editor* press **CTRL+X** than **SHIFT+Y** than **ENTER**

## Setup
Required OS: **ubuntu 22.04+**

Recommended OS: **ubuntu 22.04 LTS**

Required Software:
1. [NodeJS 16+](https://nodejs.org/en/)
2. [Veil Explorer Backend](https://github.com/steel97/veil-explorer) instance (used to retrieve basic blockchain information)
3. Snapshot mirror hosts, see [/docs/mirrors.md](/docs/mirrors.md)

## Update packges
```bash
sudo apt update
sudo apt upgrade
```

## Install NodeJS 16
```bash
# add nodesource PPA
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
# install nodejs
sudo apt install nodejs
```

## Create user for frontend app
```bash
sudo adduser website
sudo usermod -aG sudo website
```

## Create app directory
```bash
sudo mkdir /home/website/server/
```

## Download and unpack frontend build (change version in link and command to actual)
```bash
sudo wget https://github.com/Veil-Project/Veil-Tools-Website/releases/download/latest/veil.tools-2.0.0.tar.gz
sudo tar -xzf veil.tools-2.0.0.tar.gz -C /home/website/server/
```

## Issue permissions for frontend
```bash
sudo chmod 755 /home/website/server
sudo chown -R website /home/website/server/
```

## Create startup script
*variables starting from CHAIN_DEFAULT are public, so dont use sensetive data here*
```bash
su website
cd /home/website/server/
sudo nano start.sh
```
Add this content to opened file, change variables if required:
```bash
#!/bin/bash
# listen address, highly recommended to change it to localhost and hide nuxt server behind nginx proxy for example
export HOST=0.0.0.0
# listen port
export PORT=3000
# run in cluster mode
NITRO_PRESET=node-cluster
# url on which frontend available, used for SEO, meta tags etc.
export NUXT_BASE_URL=http://<ip>:3000
export NUXT_BASE_URL_FRONTEND=http://<ip>:3000
# escaped json string with mirrors addresses (each should contain snapshot.json speedtest.min.bin and speedtest.bin, also sha256 hashes in txt and snapshots)
export NUXT_SNAPSHOT_MIRRORS="[{\"name\": \"Mainnet\", \"icon\": \"/images/networks/mainnet.svg\", \"mirrors\": [{\"name\": \"NA1\", \"path\": \"https://mirror-na1.veil.tools/\"}, {\"name\": \"NA2\", \"path\": \"https://mirror-na2.veil.tools/\"},{\"name\": \"EU1\", \"path\": \"https://mirror-eu1.veil.tools/\"}, {\"name\": \"EU2\", \"path\": \"https://mirror-eu2.veil.tools/\"}]}, {\"name\": \"Testnet\", \"icon\": \"/images/networks/testnet.svg\", \"mirrors\": [{\"name\": \"NA1\", \"path\": \"https://mirror-na1.veil.tools/testnet/\"}, {\"name\": \"NA2\", \"path\": \"https://mirror-na2.veil.tools/testnet/\"},{\"name\": \"EU1\", \"path\": \"https://mirror-eu1.veil.tools/testnet/\"}, {\"name\": \"EU2\", \"path\": \"https://mirror-eu2.veil.tools/testnet/\"}]}]"
# explorer backend endpoint
export NUXT_EXPLORER_BACKEND_ENDPOINT=https://explorer-api.veil-project.com
# size of speedtest.min.bin
export NUXT_NETWORK_PRE_MEASURE_FILE_SIZE=51200
# size of speedtest.bin
export NUXT_NETWORK_MEASURE_FILE_SIZE=3145728

node server/index.mjs
```
See: [/docs/configuration.md](/docs/configuration.md)

## Change permissions and test frontend
```bash
sudo chmod 777 start.sh
node server/index.mjs
```
If there are no errors, move to next step.

## Register frontend as systemd service
```bash
# create new service file
sudo nano /etc/systemd/system/website.service
```

Add this content to opened file:
```bash
[Unit]
Description=Veil.tools website service

[Service]
User=website
KillMode=control-group
WorkingDirectory=/home/website/server/
ExecStart=/home/website/server/start.sh
Restart=always
TimeoutSec=300
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## Finilize service creation
```bash
sudo chmod 664 /etc/systemd/system/website.service
sudo systemctl daemon-reload
sudo systemctl enable website.service
sudo systemctl start website.service
sudo systemctl status website.service
```

Done, now veil.tools website is running as a background service.