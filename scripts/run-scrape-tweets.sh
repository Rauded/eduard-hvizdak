#!/bin/bash
# Wrapper launchd runs once a day. launchd starts with a bare environment, so we
# set an explicit PATH (Homebrew node + git) and cd into the repo before running.
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
REPO="/Users/macbook/Desktop/Projects/portfolio/tjklint.github.io"

cd "$REPO"
exec node scripts/scrape-tweets.mjs >> "$HOME/.portfolio-x-scraper/scrape.log" 2>&1
