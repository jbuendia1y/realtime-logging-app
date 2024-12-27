import { useEffect, useRef } from "react";
import { ISnackbarMessage } from "../contexts/snackbar.context";
import { IconBySnackbarVariant } from "./IconBySnackbarVariant";

interface IBackSnackbarMsg extends ISnackbarMessage {
  onEnd: (msgId: string) => void;
}

interface Props {
  msg: IBackSnackbarMsg;
}

export const SnackbarItem = ({ msg }: Props) => {
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const animateEnd = () => {
      const animation = itemRef.current?.animate(
        [
          { filter: "brightness(1)" },
          { filter: "brightness(0.5)" },
          { filter: "brightness(0)" },
        ],
        { duration: 500, iterations: 1 }
      );
      return animation?.finished;
    };
    const timeoutId = setTimeout(async () => {
      await animateEnd();
      msg.onEnd(msg.id);
    }, msg.duration * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [msg]);

  return (
    <div
      ref={itemRef}
      className={`
              flex items-center w-max px-6 py-5 animate-showElement rounded-lg shadow-md ${
                msg.variant === "info"
                  ? "bg-blue-600"
                  : msg.variant === "success"
                  ? "bg-green-600"
                  : msg.variant === "error"
                  ? "bg-red-600"
                  : msg.variant === "warn"
                  ? "bg-yellow-600"
                  : "bg-blue-600"
              }
            `}
    >
      <IconBySnackbarVariant variant={msg.variant} />
      <span className="inline-block ml-2">{msg.message}</span>
    </div>
  );
};
