import { useEffect, useState } from "react";
import {
  ISnackbarMessage,
  SNACKBAR_ADD_MESSAGE_EVENT,
} from "../contexts/snackbar.context";
import { SnackbarItem } from "../components/SnackbarItem";

export const SnackbarProvider = () => {
  const [messages, setMessages] = useState<Array<ISnackbarMessage>>([]);

  useEffect(() => {
    const handleNewMessage = (e: Event) => {
      const payload = (e as CustomEvent<ISnackbarMessage>).detail;
      setMessages((v) => {
        if (v.length === 5) v.pop();
        return v.concat(payload);
      });
    };
    window.addEventListener(SNACKBAR_ADD_MESSAGE_EVENT, handleNewMessage);
    return () => {
      window.removeEventListener(SNACKBAR_ADD_MESSAGE_EVENT, handleNewMessage);
    };
  }, []);

  const handleEndSnack = (msgId: string) => {
    setMessages((v) => v.filter((msg) => msg.id !== msgId));
  };

  return (
    <div className="fixed bottom-0 left-0 flex flex-col gap-3 p-2 text-white font-bold">
      {messages.map((msg) => (
        <SnackbarItem
          key={`snackbar-msg-${msg.id}`}
          msg={{ ...msg, onEnd: handleEndSnack }}
        />
      ))}
    </div>
  );
};
