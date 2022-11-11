# Hospital IMS Project

## Members

Antonio Vazquez-Mackay, Connor Doman, Eric Launer, Leo Henon

## Description

The purpose of this project is to create an inventory management system for a hospital capable of tracking stored items, ordering new items, storing user information such as permission level, forecasting shortages, and automatically ordering new items when stocks are low.

## Installation

First, clone the repository:

```bash
$ git clone https://github.com/cosc310team24/project.git
```

You will need to install `node` and `yarn` to run this project. You can install `node` by following the instructions [here](https://nodejs.org/en/download/). You can install `yarn` by following the instructions [here](https://yarnpkg.com/en/docs/install).

Before you can run the app you need to install the project's dependencies. Open a terminal in the folder you cloned and run `$ yarn install`.

## Running the application

From a terminal in the folder you cloned, run `$ yarn dev`. This will start the server which automatically compiles and reloads the project in the browser. You can access the project at `http://localhost:3000` or whatever IP it says.

## Classes

### Warehouse

This class defines a warehouse used for storage item and tracks the total storage space, remaining storage space, warehouse ID, and a changelog of the warehouse's items. It allows the addition and removal of items while keeping track of which staff member removed what items and notifies users if they attempt to remove an item above their permission level.

### Cart

This class keeps a list of items along with their quantities in the system's cart and allows the addition or removal of one or multiple items at a time.

## Testing

Information about testing can be found at [/testing](/testing).
