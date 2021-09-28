#!/bin/bash

clear;

echo '###################################'
echo '############### Code Updation is in progress... ################'
git pull

####################################
# Android hash key : ZeoZk63f+vxRe2SoiddeE0oZn4w=
keyStoreFile=keystore
exportOptionsPlist=ExportOptionsPlist.plist
password="radius123"
key_alias="xenius sems"


DATE=$(date +%d%m%Y%H%M%S)
foldername="Xenius"/"$DATE"
targetFolder=~/Desktop/"$foldername"

mkdir -p  "$targetFolder"
cp "$exportOptionsPlist" "$targetFolder"/
cp "$keyStoreFile" "$targetFolder"/

APP_NAME=Xenius_X.O_"$DATE"

archivePath="$targetFolder"/"$APP_NAME".xcarchive
exportOptionsPlistPath="$targetFolder"/"$exportOptionsPlist"

UNSINGED_APK_NAME=app-release.apk
ALIGNED_APK_NAME="$targetFolder"/app-release-unsigned-aligned.apk
RELEASE_APK_NAME="$targetFolder"/"$APP_NAME".apk
KEY_STORE="$targetFolder"/"$keyStoreFile"


#######################################

echo '###################################'
echo '############### IOS Build Started ################'
react-native bundle --minify --entry-file index.js --platform ios --dev false --bundle-output ./ios/main.jsbundle --assets-dest ./ios
cd ./ios

xcodebuild -workspace NPCLProject.xcworkspace -scheme NPCLProject -sdk iphoneos -configuration AppStoreDistribution archive -archivePath "$archivePath"

xcodebuild -exportArchive -archivePath "$archivePath" -exportOptionsPlist "$exportOptionsPlistPath" -exportPath "$targetFolder"/

cd ..


##########
echo '###################################'
echo '############### Android Build Started ################'
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
rm -rf ./android/app/src/main/res/drawable-*

rm -rf ./android/app/src/main/res/raw
cd android/

rm -rf app/build
rm -rf build

#rm -rf $HOME/.gradle/caches/

./gradlew clean
./gradlew assembleRelease

cd ..


#cp ./android/app/build/outputs/apk/"$UNSINGED_APK_NAME" "$targetFolder"/

#Tmporary fix for android build issue
cp ./android/app/build/outputs/apk/release/"$UNSINGED_APK_NAME" "$targetFolder"/

ANDROID_BUILD_TOOL=~/Library/Android/sdk/build-tools/29.0.2

"$ANDROID_BUILD_TOOL"/zipalign -v -p 4 "$targetFolder"/"$UNSINGED_APK_NAME" "$ALIGNED_APK_NAME"

"$ANDROID_BUILD_TOOL"/apksigner sign --ks "$KEY_STORE" --ks-pass pass:"$password" --out "$RELEASE_APK_NAME" "$ALIGNED_APK_NAME"

"$ANDROID_BUILD_TOOL"/apksigner verify "$RELEASE_APK_NAME"


cd "$targetFolder"

echo "BUILD PATH : ";pwd

# ls | grep -v Xenius.*$| xargs rm
ls | grep -v Xenius.*$| xargs rm

open .
