#!/bin/bash

echo "**************************************"
echo "****** install npm dependencies ******"
echo "**************************************"

docker container run --rm -v $(pwd):/usr/app -w /usr/app node:17-alpine npm install --prefer-online

echo "****** finish install npm dependencies ******"

echo "*************************"
echo "****** testing app ******"
echo "*************************"

docker container run --rm -v $(pwd):/usr/app -w /usr/app node:17-alpine npm run test

echo "****** finish testing app ******"
