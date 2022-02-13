# API

There are several API endpoints available for veil.tools website:
1. /api/getchaininfo

*Returns basic blockchain information (simplified cached version of blockchain information from explorer-backend API)*
```bash
{
    # request status (true - handled, false - error)
    "status": true,
    # time when information was cached
    "timestamp": 1644754322,
    # actual block height
    "height": 1611156,
    # actual blockchain size on disk
    "sizeOnDisk": 23739321075
}
```


2. /api/getprice

*Returns current VEIL price in USD (cached version of coingecko API)*
```bash
{
    # request status (true - handled, false - error)
    "status": true,
    # time when information was cached
    "timestamp": 1644754322,
    # price of VEIL in USD
    "price": 0.00932158
}
```

3. /api/getmirrors

*Returns all available mirrors for both mainnet and testnet*
```bash
{
  # time when information was cached
  "timestamp": 1644760940,
  # dictionary, key = network name, value = description
  "networks": {
    "mainnet": {
      # icon of network
      "icon": "/images/networks/mainnet.svg",
      # name of network
      "name": "Mainnet",
      # available mirrors
      "mirrors": [
        {
          # mirror name
          "name": "NA1",
          # mirror path
          "path": "https://mirror-na1.veil.tools/",
          # available snapshots
          "snapshots": [
            {
              # name (to get download url, concat mirror path with snapshot name)
              "name": "20220210-veil-snapshot-1606049.zip",
              # sha256 of snapshot archive
              "sha256": "dac39a9d36f693d29db85a938a3b20c9ed527438ce500661bdc948673064e785",
              # blocks included with snapshot
              "block": "1606049",
              # date when snapshot was created
              "date": "20220210"
            }
          ]
        }
      ]
    }
  }
}
```