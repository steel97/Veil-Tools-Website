# Veil-Tools-Website
This website host Veil Blockchain snapshot files

Example: [veil.tools](https://veil.tools)

# Features
- multilingual UI (see [/docs/localization.md](/docs/localization.md))
- both mainnet and testnet snapshots
- snapshot mirrors, price and basic blockchain info APIs

# API
## Documentation
See [/docs/api.md](/docs/api.md)

# Compiling from sources
See [/docs/compiling.md](/docs/compiling.md)

# Getting started
## Tested OSes
Software tested on **Windows 11** and **Ubuntu 22.04**

On production environment it is recommended to use the latest version of the LTS **Ubuntu**

## Required software
- [NodeJS 20+](https://nodejs.org/en/) - required to run frontend
- [Veil Explorer Backend](https://github.com/steel97/veil-explorer) instance (used to retrieve basic blockchain information)
- Snapshot mirror hosts, see [/docs/mirrors.md](/docs/mirrors.md)

## Installation
There are basic setup guide that suitable for all supported environments and full setup tutorial wrote for **Ubuntu 22.04**
### Basic setup guide
#### Frontend
1. Unpack **veil.tools-\[version\].tar.gz**
2. Create start script which should export environment variables used as veil.tools website config:
```bash
# listen address, highly recommended to change it to localhost and hide nuxt server behind nginx proxy for example
HOST=0.0.0.0
# listen port
PORT=3000
# run in cluster mode
NITRO_PRESET=node-cluster
# url on which frontend available, used for SEO, meta tags etc.
NUXT_BASE_URL=http://<ip>:3000
NUXT_BASE_URL_FRONTEND=http://<ip>:3000
# escaped json string with mirrors addresses (each should contain snapshot.json speedtest.min.bin and speedtest.bin, also sha256 hashes in txt and snapshots)
NUXT_SNAPSHOT_MIRRORS="[{\"name\": \"Mainnet\", \"icon\": \"/images/networks/mainnet.svg\", \"mirrors\": [{\"name\": \"NA1\", \"path\": \"https://mirror-na1.veil.tools/\"}, {\"name\": \"NA2\", \"path\": \"https://mirror-na2.veil.tools/\"},{\"name\": \"EU1\", \"path\": \"https://mirror-eu1.veil.tools/\"}, {\"name\": \"EU2\", \"path\": \"https://mirror-eu2.veil.tools/\"}]}, {\"name\": \"Testnet\", \"icon\": \"/images/networks/testnet.svg\", \"mirrors\": [{\"name\": \"NA1\", \"path\": \"https://mirror-na1.veil.tools/testnet/\"}, {\"name\": \"NA2\", \"path\": \"https://mirror-na2.veil.tools/testnet/\"},{\"name\": \"EU1\", \"path\": \"https://mirror-eu1.veil.tools/testnet/\"}, {\"name\": \"EU2\", \"path\": \"https://mirror-eu2.veil.tools/testnet/\"}]}]"
# explorer backend endpoint
NUXT_EXPLORER_BACKEND_ENDPOINT=https://explorer-api.veil-project.com
# size of speedtest.min.bin
NUXT_NETWORK_PRE_MEASURE_FILE_SIZE=51200
# size of speedtest.bin
NUXT_NETWORK_MEASURE_FILE_SIZE=3145728

node server/index.mjs
```
See: [/docs/configuration.md](/docs/configuration.md)

3. Run start script


### Full setup tutorial
see [/docs/setup/frontend.md](/docs/setup.md)
#### NGINX as reverse proxy *(optional)* 
see [/docs/setup/nginx.md](/docs/setup/nginx.md)
