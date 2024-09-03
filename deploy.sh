#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git add . -f
git commit -m 'deploy'

git subtree push --prefix dist origin dh-pages

cd -