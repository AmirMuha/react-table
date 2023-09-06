import React from "react";
import { Provider } from "jotai";
import { ProviderProps } from "types";

export default function TableProvider({ store, children }: React.PropsWithChildren<ProviderProps>) {
  return (
    <React.Fragment>
      <Provider store={store}>{children}</Provider>
    </React.Fragment>
  );
}
