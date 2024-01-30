# Website configuration
## Configuring process overview
Website take configuration from environment variables.

Default way to run website with custom configuration is to create startup script.

On **linux** variables defined in script this way:
```bash
export [key]=[value]
```
On **windows**:
```
set [key]=[value]
```

## Available parameters
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
```