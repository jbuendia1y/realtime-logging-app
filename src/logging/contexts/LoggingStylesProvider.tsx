import { PropsWithChildren, useState } from "react";
import { LoggingStylesContext } from "./LoggingStylesContext";

export const LoggingStylesProvider = (props: PropsWithChildren) => {
  const [formatJson, setFormatJson] = useState(false);
  return (
    <LoggingStylesContext.Provider
      value={{
        formatJson: formatJson,
        toggleFormat: () => setFormatJson((v) => !v),
      }}
    >
      {props.children}
    </LoggingStylesContext.Provider>
  );
};
