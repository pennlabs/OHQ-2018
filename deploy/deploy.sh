#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

eval "$(ssh-agent -s)"
chmod 600 deploy/deploy_key
ssh-add deploy/deploy_key
git remote add dokku dokku@apps.pennlabs.org:ohq
git push dokku
