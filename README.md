# Hospital IMS Project

## Members

Antonio Vazquez-Mackay, Connor Doman, Eric Launer, Leo Henon

## Usage

## Description

The purpose of this project is to create an inventory management system for a hospital capable of tracking stored items, ordering new items, storing user information such as permission level, forecasting shortages, and automatically ordering new items when stocks are low.

### Installation

First, clone the repository:

```bash
$ git clone https://github.com/cosc310team24/project.git
```

You will need to install `node` and `yarn` to run this project. You can install `node` by following the instructions [here](https://nodejs.org/en/download/). You can install `yarn` by following the instructions [here](https://yarnpkg.com/en/docs/install).

Before you can run the app you need to install the project's dependencies. Open a terminal in the folder you cloned and run `$ yarn install`.

### Running the application

From a terminal in the folder you cloned, run `$ yarn dev`. This will start the server which automatically compiles and reloads the project in the browser. You can access the project at `http://localhost:3000` or whatever IP it says.

### Class descriptions

#### Warehouse

This class defines a warehouse used for storage item and tracks the total storage space, remaining storage space, warehouse ID, and a changelog of the warehouse's items. It allows the addition and removal of items while keeping track of which staff member removed what items and notifies users if they attempt to remove an item above their permission level.

#### Cart

This class keeps a list of items along with their quantities in the system's cart and allows the addition or removal of one or multiple items at a time.

## Testing

### Description

Testing is done using the Cypress testing framework. It can perform tests on the components themselves as well as by mimicking user stories and verifying the functionality of the application as a whole.

Component tests are in `cypress/component`.

### How to create a Component Test

Inside the `cypress/component` folder, create a new file with the name of the component you are testing. For example, if you are testing the `Button` component, create a file called `Button.cy.jsx` (or `.js`).

Inside the file, import the component you are testing:

```jsx
import Button from "/components/Button.jsx";

//...
```

Then place all your unit tests inside the `describe` block:

```jsx
// imports...

describe("Button.cy.jsx", () => {
    //...
});
```

Tests, as much as possible, are designed to be coded in a way that feels like natural language. For each test you want to perform, use the `it()` function with a description of the test as the first argument. For example, if a button needed to be disabled when it's mounted:

```jsx
// imports...

describe("Button.cy.jsx", () => {
    it("should be disabled on mount", () => {
        //...
    });
});
```

Then, inside the callback (the second argument), write the code that will perform the test. For example, if the button is disabled when it's mounted, you can check if the button is disabled by using the `cy.get()` function to get the button and then using the `should()` function to check if the button is disabled:

```jsx
// imports...

describe("Button.cy.jsx", () => {
    it("should be disabled on mount", () => {
        cy.get('[data-cy="button"]').should("be.disabled");
    });
});
```

The first argument of `cy.get()`, `'[data-cy="button"]'` is an attribute of the actual button element. This is used to identify the button in the DOM.

```jsx
function Button() {
    // const handleClick = ()...

    return (
        <button data-cy="button" onClick={handleClick}>
            Click me
        </button>
    );
}
```

You can write multiple `it()` blocks inside a `describe()` block to test multiple things about the component.

### Running Component Tests

Once you're satisfied with the component tests, you can run them by running the following command:

```bash
yarn cypress
```

This will open the Cypress test runner. Select `Component Testing`. Then select the browser you'd like to run the tests in. Choose the component you'd like to test and then your results will be displayed.

If your component fails the tests, Cypress will inform you where and how the failure occurred. Edit your components appropriately.

## Features

#### Profile Displays

Allows users to see the profiles of staff members including their id, first name, last name, email, and permission level. The example image shows the profile page with some test profiles. 
![image](https://user-images.githubusercontent.com/113552143/201818540-2286f133-5cdc-45ff-b4af-f9e96b5bca2c.png)

#### Pass Cart to Checkout, then to Shipments

Allows for items in the cart/order page to be passed to checkout, which can then be passed to the shipments page. The example images show how items from the order page can be added to shipments
![image](https://user-images.githubusercontent.com/113552143/201818929-81775b20-395c-4ea7-ac68-0797b9d87e49.png)
![image](https://user-images.githubusercontent.com/113552143/201818981-f3b0ed64-f046-4508-bb3a-064c49d94b54.png)

#### Filter and Search Shipments + GUI to Modify Active Shipments

Allows users to search the shipments page by shipment ID, date, status, price, and priority. Also allows for the cancellation of active shipments or the option of rushing them if they are needed sooner. The example image shows the shipments list sorted by status, where it was sorted by ID in the previous image. 
![image](https://user-images.githubusercontent.com/113552143/201820384-a5988e4d-a00d-4535-a4a4-366fd511c2b2.png)

#### Warehouse GUI for Modifying and Reviewing Inventory

Allows for the viewing of warehouse inventory, adding/removing of items, and viewing of change history. The example image shows warehouse 123 after an item with ID 123 was added. 
![image](https://user-images.githubusercontent.com/113552143/201820182-68c32d32-b3ef-4909-9473-6f341ea59751.png)
