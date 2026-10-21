#!/bin/bash

set -e

if [[ $# -lt 2 || $# -gt 3 || ( $1 != "plugin" && $1 != "theme" ) ]]; then
	echo "USAGE: $0 (plugin|theme) <slug> [<version>]"
	exit 1
fi

type=$1
slug=$2
version=${3:-}

echo "Obtaining ${type} info..."
data="$(curl -gs "https://api.wordpress.org/${type}s/info/1.2/?action=${type}_information&request[slug]=${slug}")"
download_url="$(echo "${data}" | jq -r .download_link 2>/dev/null || echo "null")"

if [[ ${download_url} == "null" ]]; then
	echo "${type} '${slug}' was not found"
	exit 1
fi

if [[ -n "${version}" ]]; then
	# Pin a specific release instead of the newest one. WordPress.org only ever
	# hands out the latest zip, but the versioned URL below is stable.
	echo "Pinning ${slug} to ${version} ..."
	download_url="https://downloads.wordpress.org/${type}/${slug}.${version}.zip"
fi

echo "Downloading ${type} ..."
tmpfile=$(mktemp)
curl -s "${download_url}" >"${tmpfile}"

echo "Unpacking ${type} ..."
mkdir -p "./wp-content/${type}s"
unzip -qq -d "./wp-content/${type}s" "${tmpfile}"
rm "${tmpfile}"

echo "${type} '${slug}' successfully installed."
