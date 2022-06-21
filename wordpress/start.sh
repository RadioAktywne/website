#!/bin/bash

web_url="${WORDPRESS_WEB_URL:-http://localhost:3000}"
root_url="${WORDPRESS_ROOT_URL:-http://localhost}"
title="${WORDPRESS_SITE_TITLE:-Radio Aktywne}"
username="${WORDPRESS_ADMIN_USERNAME:-username}"
password="${WORDPRESS_ADMIN_PASSWORD:-password}"
email="${WORDPRESS_ADMIN_EMAIL:-example@example.com}"

docker-entrypoint.sh apache2-foreground &
pid="$!"

# wait until wordpress is ready
until curl -sLf 'http://localhost:80' >/dev/null; do
  echo "WordPress is unavailable - sleeping for 1 second"
  sleep 1
done

echo "WordPress available. Setting up..."

if ! wp core is-installed --allow-root &>/dev/null; then
  echo "WordPress not yet installed. Installing..."
  wp core install --allow-root \
    "--url=$root_url" \
    "--title=$title" \
    "--admin_user=$username" \
    "--admin_email=$email" \
    --prompt=admin_password <<<"$password" >/dev/null || exit 1
  wp option update home "$web_url" --allow-root
else
  echo "WordPress is already installed. Url, title and admin user won't be changed even if configuration is different."
fi

echo "Configuring basic themes and plugins..."

wp theme activate redirect --allow-root
wp plugin activate fix-rest hide-menu-items remove-redirects --allow-root
wp plugin install disable-comments --activate --allow-root
wp disable-comments settings --types=all --allow-root

echo "Removing preinstalled bloatware..."

wp theme delete twentytwenty twentytwentyone twentytwentytwo --allow-root
wp plugin uninstall akismet hello --deactivate --allow-root

echo "WordPress is set up!"

wait "$pid"