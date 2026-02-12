#!/bin/sh

# Recreate env-config.js with current environment variables
# This runs at container startup to inject runtime env vars

ENV_FILE="/usr/share/nginx/html/env-config.js"

# Start building the JavaScript file
echo "window.__ENV = {" > "$ENV_FILE"

# Read each environment variable that starts with VITE_
env | grep '^VITE_' | while IFS='=' read -r key value; do
  echo "  $key: \"$value\"," >> "$ENV_FILE"
done

echo "};" >> "$ENV_FILE"

echo "Runtime env-config.js generated:"
cat "$ENV_FILE"
