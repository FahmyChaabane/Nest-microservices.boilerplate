#!/bin/bash

echo "***************************************************"
echo "****** send publish file to ubuntu container ******"
echo "***************************************************"

sshpass -p $UBUNTU_PASS scp $(pwd)/jenkins/deploy/publish.sh root@ubuntuno:/tmp/publish.sh

echo "**************************************************************"
echo "****** send env variables & secrets to ubuntu container ******"
echo "**************************************************************"

echo $ACCOUNT_NAME > /tmp/.auth
echo $IMAGE_NAME >> /tmp/.auth
echo $BUILD_TAG >> /tmp/.auth
echo $PASS >> /tmp/.auth

sshpass -p $UBUNTU_PASS scp /tmp/.auth root@ubuntuno:/tmp/.auth

echo "**********************************"
echo "****** execute publish file ******"
echo "**********************************"

sshpass -p $UBUNTU_PASS ssh root@ubuntuno "/tmp/publish.sh"
