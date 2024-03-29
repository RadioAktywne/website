FROM php:7.4-apache

ARG WORDPRESS_VERSION=6.3.2
ARG WORDPRESS_SHA=858a79f5916909715e79df4b87fc4f30172e8254
ARG WP_CLI_VERSION=2.9.0
ARG WP_CLI_SHA=263dc2b67bdd97bd58519ca273e56be4905dea0e

SHELL ["/bin/bash", "-euxo", "pipefail", "-c"]

# persistent dependencies
# hadolint ignore=DL3008
RUN apt-get update; \
	apt-get install -y --no-install-recommends \
# Ghostscript is required for rendering PDF previews
		ghostscript \
# jq and unzip are required to download plugins
        jq \
        unzip \
# mysql-client is required for wp db cli
        default-mysql-client \
# image conversion libraries 
		jpegoptim \
		optipng \
		webp \
    ; \
	rm -rf /var/lib/apt/lists/*

# install the PHP extensions we need (https://make.wordpress.org/hosting/handbook/handbook/server-environment/#php-extensions)
# hadolint ignore=DL3008,SC2086
RUN savedAptMark=$(apt-mark showmanual); \
	\
	apt-get update; \
	apt-get install -y --no-install-recommends \
		libfreetype6-dev \
		libicu-dev \
		libjpeg-dev \
		libmagickwand-dev \
		libpng-dev \
		libwebp-dev \
		libzip-dev \
	; \
	\
	docker-php-ext-configure gd \
		--with-freetype \
		--with-jpeg \
		--with-webp \
	; \
	docker-php-ext-install -j "$(nproc)" \
		bcmath \
		exif \
		gd \
		intl \
		mysqli \
		zip \
	; \
# https://pecl.php.net/package/imagick
	pecl install imagick-3.6.0; \
	docker-php-ext-enable imagick; \
	rm -r /tmp/pear; \
	\
# some misbehaving extensions end up outputting to stdout 🙈 (https://github.com/docker-library/wordpress/issues/669#issuecomment-993945967)
	out="$(php -r 'exit(0);')"; \
	[ -z "$out" ]; \
	err="$(php -r 'exit(0);' 3>&1 1>&2 2>&3)"; \
	[ -z "$err" ]; \
	\
	extDir="$(php -r 'echo ini_get("extension_dir");')"; \
	[ -d "$extDir" ]; \
# reset apt-mark's "manual" list so that "purge --auto-remove" will remove all build dependencies
	apt-mark auto '.*' > /dev/null; \
	apt-mark manual $savedAptMark; \
	ldd "$extDir"/*.so \
		| awk '/=>/ { print $3 }' \
		| sort -u \
		| xargs -r dpkg-query -S \
		| cut -d: -f1 \
		| sort -u \
		| xargs -rt apt-mark manual; \
	\
	apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
	rm -rf /var/lib/apt/lists/*; \
	\
	! { ldd "$extDir"/*.so | grep 'not found'; }; \
# check for output like "PHP Warning:  PHP Startup: Unable to load dynamic library 'foo' (tried: ...)
	err="$(php --version 3>&1 1>&2 2>&3)"; \
	[ -z "$err" ]

# set recommended PHP.ini settings
# see https://secure.php.net/manual/en/opcache.installation.php
RUN docker-php-ext-enable opcache; \
	{ \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=2'; \
		echo 'opcache.fast_shutdown=1'; \
	} > /usr/local/etc/php/conf.d/opcache-recommended.ini
# https://wordpress.org/support/article/editing-wp-config-php/#configure-error-logging
RUN { \
# https://www.php.net/manual/en/errorfunc.constants.php
# https://github.com/docker-library/wordpress/issues/420#issuecomment-517839670
		echo 'error_reporting = E_ERROR | E_WARNING | E_PARSE | E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_COMPILE_WARNING | E_RECOVERABLE_ERROR'; \
		echo 'display_errors = Off'; \
		echo 'display_startup_errors = Off'; \
		echo 'log_errors = On'; \
		echo 'error_log = /dev/stderr'; \
		echo 'log_errors_max_len = 1024'; \
		echo 'ignore_repeated_errors = On'; \
		echo 'ignore_repeated_source = Off'; \
		echo 'html_errors = Off'; \
	} > /usr/local/etc/php/conf.d/error-logging.ini

RUN a2enmod rewrite expires; \
	\
# https://httpd.apache.org/docs/2.4/mod/mod_remoteip.html
	a2enmod remoteip; \
	{ \
		echo 'RemoteIPHeader X-Forwarded-For'; \
# these IP ranges are reserved for "private" use and should thus *usually* be safe inside Docker
		echo 'RemoteIPTrustedProxy 10.0.0.0/8'; \
		echo 'RemoteIPTrustedProxy 172.16.0.0/12'; \
		echo 'RemoteIPTrustedProxy 192.168.0.0/16'; \
		echo 'RemoteIPTrustedProxy 169.254.0.0/16'; \
		echo 'RemoteIPTrustedProxy 127.0.0.0/8'; \
	} > /etc/apache2/conf-available/remoteip.conf; \
	a2enconf remoteip; \
# https://github.com/docker-library/wordpress/issues/383#issuecomment-507886512
# (replace all instances of "%h" with "%a" in LogFormat)
	find /etc/apache2 -type f -name '*.conf' -exec sed -ri 's/([[:space:]]*LogFormat[[:space:]]+"[^"]*)%h([^"]*")/\1%a\2/g' '{}' +

RUN curl -o wordpress.tar.gz -fL "https://wordpress.org/wordpress-$WORDPRESS_VERSION.tar.gz"; \
	echo "$WORDPRESS_SHA  wordpress.tar.gz" | sha1sum -c -; \
	\
# upstream tarballs include ./wordpress/ so this gives us /usr/src/wordpress
	tar -xzf wordpress.tar.gz -C /usr/src/; \
	rm wordpress.tar.gz; \
# pre-create uploads
    mkdir /usr/src/wordpress/wp-content/uploads;

RUN curl -o /usr/local/bin/wp -fL https://github.com/wp-cli/wp-cli/releases/download/v$WP_CLI_VERSION/wp-cli-$WP_CLI_VERSION.phar; \
    echo "$WP_CLI_SHA  /usr/local/bin/wp" | sha1sum -c -; \
    chmod +x /usr/local/bin/wp

WORKDIR /app

# move downloaded wordpress and change apache directory to working directory
RUN mv /usr/src/wordpress/* ./ && \
	find /etc/apache2 -name '*.conf' -type f -exec sed -ri -e "s!/var/www/html!$PWD!g" -e "s!Directory /var/www/!Directory $PWD!g" '{}' +;

COPY ./scripts/download.sh ./scripts/download.sh
RUN chmod +x ./scripts/download.sh

# preload plugins
RUN ./scripts/download.sh plugin disable-comments; \
    ./scripts/download.sh plugin advanced-custom-fields; \
    ./scripts/download.sh plugin squidge

COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

COPY ./scripts/ ./scripts/
RUN find ./scripts/ -type f -iname "*.sh" -exec chmod +x {} \+

COPY ./themes/ ./wp-content/themes/
COPY ./plugins/ ./wp-content/plugins/

COPY ./wp-config.php ./wp-config.php
COPY ./.htaccess ./.htaccess

ENV WORDPRESS_DATABASE_NAME=database \
    WORDPRESS_DATABASE_USER=user \
    WORDPRESS_DATABASE_PASSWORD=password \
    WORDPRESS_DATABASE_HOST=localhost \
	WORDPRESS_DATABASE_PORT=20001 \
    WORDPRESS_DATABASE_CHARSET=utf8 \
    WORDPRESS_DB_COLLATE='' \
    WORDPRESS_AUTH_KEY=auth-key \
    WORDPRESS_SECURE_AUTH_KEY=secure-auth-key \
    WORDPRESS_LOGGED_IN_KEY=logged-in-key \
    WORDPRESS_NONCE_KEY=nonce-key \
    WORDPRESS_AUTH_SALT=auth-salt \
    WORDPRESS_SECURE_AUTH_SALT=secure-auth-salt \
    WORDPRESS_LOGGED_IN_SALT=logged-in-salt \
    WORDPRESS_NONCE_SALT=nonce-salt \
    WORDPRESS_TABLE_PREFIX=wp_ \
    WORDPRESS_DEBUG='' \
    WORDPRESS_CONFIG_EXTRA='' \
    WORDPRESS_PUBLIC_URL='http://localhost:20000' \
    WORDPRESS_SITE_TITLE='Radio Aktywne' \
    WORDPRESS_ADMIN_USERNAME=username \
    WORDPRESS_ADMIN_PASSWORD=password \
    WORDPRESS_ADMIN_EMAIL='example@example.com' \
	WORDPRESS_MAX_UPLOAD_SIZE=512M

EXPOSE 80

ENTRYPOINT ["./entrypoint.sh", "./scripts/start.sh"]
CMD []
