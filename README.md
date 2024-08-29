## ABOUT

Implementation of a simple Cloudflare Worker that retrieves assets from R2. 
The logic expects image assets (.png files) to be present in Cloudflare R2. A script is included to upload the images.

### TO UPLOAD IMAGES TO R2

```
# The script will prompt to authenticate with Cloudflare.

cd src/asset-flags
./r2_upload_flags.sh
```

### TO DEPLOY THE WORKER TO CLOUDFLARE

```
# Check Cloudflare documentation for the pre-requisites: https://developers.cloudflare.com/workers/get-started/guide/

# Deploy the worker
npx wrangler deploy
```
