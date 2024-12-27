import {
  ISnackbarMessage,
  SNACKBAR_ADD_MESSAGE_EVENT,
} from "../contexts/snackbar.context";

interface SnackMessage extends Omit<Omit<ISnackbarMessage, "id">, "duration"> {
  duration?: number; // seconds
}

export const useSnackbar = () => {
  /**
   *
   * @param msg
   * @returns Message ID
   */
  const show = (msg: SnackMessage): string => {
    const msgId = crypto.randomUUID();
    window.dispatchEvent(
      new CustomEvent<ISnackbarMessage>(SNACKBAR_ADD_MESSAGE_EVENT, {
        detail: { ...msg, id: msgId, duration: msg.duration ?? 3 },
      })
    );
    return msgId;
  };
  return { show };
};
