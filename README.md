# Plan A Frontend Coding Challenge

## Intro

This dashboard consists of a chart that displays the GHG emissions of Germany from the period 2019-02-01 to 2022-06-15.
Is possible to select a GHG type to get its related data.

## Install

To install the application dependencies, use `yarn install`

## Execute

To run the application locally in development mode, use `yarn start`

### Testing

- To execute the unit tests use `yarn test`

## Available Scripts

### `yarn start`

### `yarn test`

## Data

This open-source API is being used to fetch the GHG emission data: https://api.v2.emissions-api.org/ui/

## Styles

To add CSS style is being used css-modules because it is efficient and it is scoped locally

## Warning

The recharts ResponsiveContainer is [not working with React 18 render method](https://github.com/recharts/recharts/issues/2831).
So it is being used the React 17 render for the App, which gives a warning on the console.

## Libraries

Please use the following libraries for your solution.

- [react](https://reactjs.org/)
- [typescript](https://www.typescriptlang.org/)
- [axios](https://axios-http.com/)
- [recharts](https://recharts.org/en-US/)
- [testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
