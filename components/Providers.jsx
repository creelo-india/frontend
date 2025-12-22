"use client";

import { Provider } from "react-redux";
import store from "../src/redux/store";
import Header from "../src/components/MegaMenu/Header";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
}
