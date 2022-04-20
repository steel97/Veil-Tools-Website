# Mirrors
Mirrors can be hosted using any webserver, we recommend **nginx**:

[nginx 1.18.0+](https://nginx.org/en/)


Root www folder (usually located at */var/www/html* on *nix systems) should contain snapshots packed into **ZIP** archive, near zip archive should be also **JSON** file with snapshots list and speedtest.bin/speedtest.min.bin files. For testnet new folder can be created at */var/www/html/testnet*

Create folder for testnet snapshots
```bash
mkdir /var/www/html/testnet
```

Put all your snapshot zips in */var/www/html* and */var/www/html/testnet*

Create txt file with sha256 hash of each snapshot archive, format:
```
<sha256 hash> <archive name>
```
Example:
```
935dbf1703f7fd210aa3b5dc120b4a71a1a7983883bb22cb291530469d9632dc  20220208-veil-snapshot-1603475.zip
```

Create **speedtest.min.bin** and **speedtest.bin** files in all network folders
```bash
dd if=/dev/zero of=/var/www/html/speedtest.min.bin bs=51200 count=1
dd if=/dev/zero of=/var/www/html/testnet/speedtest.min.bin bs=51200 count=1
dd if=/dev/zero of=/var/www/html/speedtest.bin bs=3145728 count=1
dd if=/dev/zero of=/var/www/html/testnet/speedtest.bin bs=3145728 count=1
```

Create **JSON** configuration for snapshots
```bash
# open snapshot.json file
nano /var/www/html/snapshot.json
# put next content, remove comments
{
  "status": {
    "errorcode": "0",
    "errormsg": "ok"
  },
  "snapshots": [
    {
      "name": "20220208-veil-snapshot-1603475.zip", # name of this archive
      "sha256": "sha256sum_20220208_1603475.txt",   # name of file with sha256 hash of archive
      "block": "1603475", # latest block in snapshot
      "date": "20220208"  # date when snapshot was created
    },
    ...
  ]
}
```
