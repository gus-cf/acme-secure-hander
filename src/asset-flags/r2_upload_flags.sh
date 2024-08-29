#!/bin/sh

# Login to Cloudflare
npx wrangler login

# Create R2 bucket
npx wrangler r2 bucket create country-flags

# Upload the flags
for IMAGE_NAME in `ls -1 *.png`; do
  npx wrangler r2 object put country-flags/$IMAGE_NAME --file=$IMAGE_NAME
done

