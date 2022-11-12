# itzme

A simple mobile application for Android, built with [Flutter](https://flutter.dev).

<p align="middle">
  <img src="https://github.com/ItzyBitzySpider/itzme/tree/master/mobile-app/docs/credentials.png" width="100" />
  <img src="https://github.com/ItzyBitzySpider/itzme/tree/master/mobile-app/docs/qr_code_scanner.png" width="100" /> 
  <img src="https://github.com/ItzyBitzySpider/itzme/tree/master/mobile-app/docs/popup.png" width="100" />
</p>

## Repository Structure
All relevant folders are in the `lib`, where all the code is organized into 4 folders.

1. [`models`](lib/models/)

This folder contains classes and objects used throughout the application. As of now, it only contains the `Credentials` class, which handles the storage of users' private keys and block numbers.

2. [`screens`](lib/screens/)

This folder holds code for the UI of the application, and some basic application functionality.

3. [`services`](lib/services/)

The code in this folder lets the application connect and communicate with external applications and services. There are 3 services as of now:
* ['auth.dart'](lib/services/auth.dart) - Authentication using PIN or biometrics
* ['blockchain.dart](lib/services/blockchain.dart) - Sends and retrieves data from the blockchain server
* ['hive.dart'](lib/services//hive.dart) - Handles the storage of data locally in the device

4. [`widgets`](lib/widgets.dart/)

This folder is not as important, it contains widgets that are commonly used throughout the application.

## Getting Started

### Setup
Follow the instructions from [here](https://docs.flutter.dev/get-started/install) to install Flutter.

At the time of writing this, Flutter `v3.3.0` was used:
```bash
$ flutter --version
Flutter 3.3.0 • channel stable • https://github.com/flutter/flutter.git
Framework • revision ffccd96b62 (3 months ago) • 2022-08-29 17:28:57 -0700
Engine • revision 5e9e0e0aa8
Tools • Dart 2.18.0 • DevTools 2.15.0
```

### Running the app
After Flutter is installed, run `flutter doctor` to make sure everything is good.

To run the app, ensure a device is running and use the following command:
```bash
flutter run
```
This should automatically install the required dependencies and run the app in the connected device.