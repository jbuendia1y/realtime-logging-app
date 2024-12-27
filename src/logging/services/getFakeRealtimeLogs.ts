import { LOGS_EVENT_ADDED_EVENT_NAME } from "../constants";
import { LoggingEvent } from "../model";

export const getFakeRealtimeLogs = async (
  controller: AbortController,
  cb: (log: LoggingEvent) => Promise<void> | void
) => {
  window.addEventListener(
    LOGS_EVENT_ADDED_EVENT_NAME,
    async (e) => {
      await cb((e as CustomEvent<LoggingEvent>).detail);
    },
    { signal: controller.signal }
  );
};
