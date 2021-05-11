#!/usr/bin/env bash

# Sends an update request to a watchtower docker server

curl -m 180 -H "Authorization: Bearer $WATCHTOWER_TOKEN" $WATCHTOWER_URI

# URI: x.x.x.x:8088/v1/update
