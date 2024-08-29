## About

Implementation of a simple Cloudflare Worker that retrieves assets from R2. 
The logic expects image assets (.png files) to be present in Cloudflare R2. A script provided allows to upload the images automatically.

### How to upload the images to R2

```
# The script will prompt to authenticate with Cloudflare.

cd src/asset-flags
./r2_upload_flags.sh
```
