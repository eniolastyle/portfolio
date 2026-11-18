#!/bin/sh
set -eu

: "${DIRECTUS_URL:=https://cms.aathaar.org}"
export DIRECTUS_URL

envsubst '${DIRECTUS_URL}' \
  < /etc/portfolio/config.template.js \
  > /usr/share/nginx/html/config.js
