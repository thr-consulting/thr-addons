#!/usr/bin/env bash

# Sends a notification to a discord webhook.
#
#  discord.sh [TITLE] [DESCRIPTION] [COLOR]
#

TITLE=${1:-"Notification"}
DESC=${2:-""}
COLOR=${3:-65336}

if [ -z "${DISCORD_WEBHOOK}" ]; then
  echo "DISCORD_WEBHOOK not specified"
  exit 1
fi

# Build final json
json="{\"embeds\":[{\"color\":\"$COLOR\",\"title\":\"$TITLE\",\"description\":\"$DESC\"}]}"

# Send to webhook
curl -X POST -H "Content-Type: application/json" -d "$json" "$DISCORD_WEBHOOK"
