#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add . -f
git commit -m 'deploy'
git subtree add --prefix dist origin gh-pages
git subtree push --prefix dist origin gh-pages

cd -