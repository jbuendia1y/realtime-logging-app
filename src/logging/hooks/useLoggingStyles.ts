import { useContext } from "react";
import { LoggingStylesContext } from "../contexts/LoggingStylesContext";

export const useLoggingStyles = () => {
  const ctx = useContext(LoggingStylesContext);
  return ctx;
};
