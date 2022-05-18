#!/bin/bash

echo "*******************************"
echo "****** push to dockerhub ******"
echo "*******************************"

echo "** Logging in **"
docker login -u $ACCOUNT_NAME -p $PASS

echo "** Tagging image **"
docker tag  $IMAGE_NAME:latest $ACCOUNT_NAME/$IMAGE_NAME:$BUILD_TAG

echo "** Pushing image **"
docker push $ACCOUNT_NAME/$IMAGE_NAME:$BUILD_TAG
