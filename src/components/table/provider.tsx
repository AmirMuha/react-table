import React from "react";
import { Provider } from "jotai";
import { ProviderProps } from "types";

export type TableProviderProps = React.PropsWithChildren<ProviderProps>;
export default function TableProvider({ store, children }: TableProviderProps) {
  return (
    <React.Fragment>
      <Provider store={store}>{children}</Provider>
    </React.Fragment>
  );
}
