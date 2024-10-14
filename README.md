# Grocery Shopping Assistant

This is a React Native application designed as part of an assignment for a mobile application project. The app helps users with grocery shopping by providing features like product scanning, product details view, shopping list, and more.

## Prerequisites

Ensure you have the following tools installed on your machine:

Node.js (Recommended version 16 or later)

npm (Usually comes with Node.js)

Git

Android Studio (for Android emulator)

React Native CLI

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