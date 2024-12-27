import { useEffect, useRef, useState } from "react";
import { getFakeRealtimeLogs } from "../services/getFakeRealtimeLogs";

export const useRecordStreamLogs = () => {
  const [isRecording, setIsRecording] = useState(false);
  const readableStream = useRef<ReadableStream>();

  useEffect(() => {
    if (!isRecording) return;
    const abortController = new AbortController();

    readableStream.current = new ReadableStream({
      start(controller) {
        let isFirstChunk = true;

        getFakeRealtimeLogs(abortController, (log) => {
          if (isFirstChunk) {
            controller.enqueue("[\n"); // Initialize the JSON Array
            isFirstChunk = false;
          }
          controller.enqueue(JSON.stringify(log));
          controller.enqueue(",\n"); // Add a comma after each object
        });

        abortController.signal.addEventListener("abort", () => {
          controller.enqueue("]\n"); // Close the JSON Array
          controller.close(); // Close the stream
        });
      },
    });

    return () => {
      abortController.abort(); // Stop the data subscription
    };
  }, [isRecording]);

  const startRecord = () => {
    setIsRecording(true);
  };

  const pauseRecord = () => {
    setIsRecording(false);
  };

  const download = async () => {
    if (!readableStream.current) return;
    pauseRecord();

    const reader = readableStream.current.getReader();
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const blob = new Blob(chunks, { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const currentDate = new Date();
    link.download = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}__recorded-logs.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return { download, isRecording, startRecord, pauseRecord };
};
