#!/bin/bash

echo "***************************************"
echo "****** building the docker image ******"
echo "***************************************"

docker image build -t $IMAGE_NAME:latest --no-cache -f $(pwd)/jenkins/build/Dockerfile .

echo "********** image build finish **********"
