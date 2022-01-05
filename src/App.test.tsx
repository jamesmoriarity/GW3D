import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const apps = document.getElementsByClassName("App");
  expect(apps.length).toEqual(1);
  // find grid component
  const grids = document.getElementsByClassName("grid-container");
  expect(apps.length).toEqual(1);
});
