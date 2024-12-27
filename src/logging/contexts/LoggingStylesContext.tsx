import { createContext } from "react";

export const LoggingStylesContext = createContext({
  formatJson: false,
  toggleFormat: () => {},
});
