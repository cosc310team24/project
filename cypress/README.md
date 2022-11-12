# Testing Explained

## Description

Testing on this project was done using the `cypress` testing library. This is a library for web-based JavaScript UI frameworks. This library features end-to-end testing to simulate user stories, however this project will only be using the component testing feature.

## How to Run Component Test

Once you've installed dependencies according to the readme in the root directory, you can run the component test by running the following command:

```bash
yarn cypress
```

This will open the Cypress test runner. Select `Component Testing`. Then select the browser you'd like to run the tests in. Choose the component you'd like to test and then your results will be displayed.

If your component fails the tests, Cypress will inform you where and how the failure occurred. Edit your components appropriately.

In this project you will find 3 components that have been tested. They are:

-   `Incrementor` from `/components/Incrementor.jsx`
-   `OrderPanel` from `/componentes/OrderPanel.jsx`
-   `CartBanner` from `/components/Cart.jsx`
