#!/bin/bash

echo "*****************************"
echo "****** running the app ******"
echo "*****************************"

export ACCOUNT_NAME=$(sed -n '1p' /tmp/.auth)
export IMAGE_NAME=$(sed -n '2p' /tmp/.auth)
export BUILD_TAG=$(sed -n '3p' /tmp/.auth)
export PASS=$(sed -n '4p' /tmp/.auth)

echo "***** login to dockerhub *****"
docker login -u $ACCOUNT_NAME -p $PASS
# sudo docker login -u $ACCOUNT_NAME -p $PASS

echo "***** run the image *****"
docker container run -d --name $IMAGE_NAME --net jenky $ACCOUNT_NAME/$IMAGE_NAME:$BUILD_TAG
# sudo docker container run -d --name $IMAGE_NAME --net jenky $ACCOUNT_NAME/$IMAGE_NAME:$BUILD_TAG

echo "**** FINISH ****"
