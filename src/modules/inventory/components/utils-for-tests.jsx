// import React from "react";
// import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { store as appStore } from "../app/store"

// export default function renderWithProviders(
//   ui,
//   {
//     preloadedState = {},
//     store = appStore,
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }