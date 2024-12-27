import { createContext } from "react";

export const SNACKBAR_ADD_MESSAGE_EVENT = "@app/add-snacbar-message" as const;
export interface ISnackbarMessage {
  id: string;
  variant: "info" | "error" | "success" | "warn";
  message: string;
  duration: number; // seconds
}

export const SnackbarContext = createContext<{
  messages: ISnackbarMessage[];
}>({
  messages: [],
});
