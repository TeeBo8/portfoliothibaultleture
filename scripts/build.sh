#!/bin/bash
set -e
pnpm exec contentlayer build || echo "Contentlayer build completed (ignoring exit code)"
pnpm next build

