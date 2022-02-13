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

3. /api/getaddressbalance/<address>
* New version indicates status with response status code (only when accessed through backend endpoint)
```
400 - bad request (address is invalid or it is a stealth address)
200 - success
202 - request added to queue, retry request until you get status 200
```

4. /api/getmoneysupply
* New version uses double type for all variables except for budget_address and foundation_address