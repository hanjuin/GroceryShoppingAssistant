# Grocery Shopping Assistant

This is a React Native application designed as part of an assignment for a mobile application project. The app helps users with grocery shopping by providing features like product scanning, product details view, shopping list, and more.

## Prerequisites

Ensure you have the following tools installed on your machine:

- Node.js (Recommended version 16 or later)

- npm (Usually comes with Node.js)

- Git

- Android Studio (for Android emulator - **Preferably API 34** ) 

- React Native CLI

## Clone and run the server

1. Clone this repository to your local machine:
```
git clone https://github.com/hanjuin/GroceryShoppingAssistantServer
cd GroceryShoppingAssistantServer
```

2. Installing the Dependencies
```
npm install
```
This will install all necessary packages listed in the package.json file.

3. Run the server
```
Node server.js
```
This will run the server on the local machine.


## Cloning the project

1. Clone this repository to your local machine:

```
git clone https://github.com/hanjuin/GroceryShoppingAssistant
cd GroceryShoppingAssistant
```

2. Installing the Dependencies
```
npm install
```
This will install all necessary packages listed in the package.json file.

## Running The Application
1. Start Metro bundler:
```
npx react-native start
```
Make sure your emulator is running on Android studio or a device that connected to your machine. 


## Troubleshooting
If you encounter any issues with the build or dependencies, try:
```
cd android
./gradlew clean
cd ..
```
Resetting Metro's cache:
```
npx react-native start --reset-cache
```

## Instruction to login
A test account is available in the database for convenience:

> User ID: testing

> Password: testing!@

You can use these credentials if you prefer to skip the registration process.

## Instruction to scan a barcode
If you are running the app on an emulator, ensure you have some barcode images stored in the emulator’s photo library. 
Two sample barcodes are provided in the `test_barcode` folder. 
Simply drag these images into the emulator to add them to the photo library.

### To scan a barcode:

Click the "Scan Product" button on the home screen.
Select "Select Photo From Library" and choose a barcode image.
Wait for a moment until an alert pops up, then click "Ok."
The app will automatically navigate to the product details screen.
