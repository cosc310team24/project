# Testing Explained

## Description

Testing on this project was done using the `cypress` testing library. This is a library for web-based JavaScript UI frameworks. This library features end-to-end testing to simulate user stories, however this project will only be using the component testing feature.

## How to Run a Component Test

Once you've installed dependencies according to the readme in the root directory, you can run the component test by running the following command:

```bash
yarn cypress
```

This will open the Cypress test runner. Select `Component Testing`. Then select the browser you'd like to run the tests in. Choose the component you'd like to test and then your results will be displayed.

If your component fails the tests, Cypress will inform you where and how the failure occurred. Edit your components appropriately.

In this project you will find 3 components that have been tested. They are:

1.  `Incrementor` from `/components/Incrementor.jsx`
2.  `OrderPanel` from `/components/OrderPanel.jsx`
3.  `CartBanner` from `/components/Cart.jsx`

## Testing

### Description

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
