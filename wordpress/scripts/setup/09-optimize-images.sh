#!/usr/bin/env bash

echo "Optimizing images..."

wp plugin is-installed squidge --quiet || wp plugin install squidge

wp plugin is-active squidge --quiet || wp plugin activate squidge

# Fix needed for our version
if [[ -f wp-content/plugins/squidge/cli/Commands.php ]]; then
	mv wp-content/plugins/squidge/cli/Commands.php wp-content/plugins/squidge/cli/commands.php
fi

wp squidge run --jpg=false --png=false --avif=false --quality=80
