import { useEffect, useState } from "react";
import { getFakeRealtimeLogs } from "../services/getFakeRealtimeLogs";
import { Level, LoggingEvent } from "../model";
import { generateFakeLogs } from "../services/generateFakeLogs";
import { randomNumber } from "../../fake-data/basic";

export const useRealtimeLogs = () => {
  const [logs, setLogs] = useState<Array<LoggingEvent>>([]);
  const [countedLogs, setCountedLogs] = useState<Record<Level, bigint>>({
    [Level.DEBUG]: BigInt(0),
    [Level.INFO]: BigInt(0),
    [Level.WARN]: BigInt(0),
    [Level.ERROR]: BigInt(0),
    [Level.FATAL]: BigInt(0),
  });

  useEffect(() => {
    const controller = new AbortController();
    let subscribe = true;
    const wrapper = () => {
      setTimeout(() => {
        if (subscribe) {
          generateFakeLogs();
          wrapper();
        }
      }, randomNumber({ min: 1, max: 3 }) * 1000);
    };
    wrapper();

    getFakeRealtimeLogs(controller, (log) => {
      setLogs((value) => {
        if (value.length === 10) value.shift();
        return value.concat(log);
      });
      setCountedLogs((v) => {
        const cache = v[log.level] + BigInt(1);
        return { ...v, [log.level]: cache };
      });
    });

    return () => {
      subscribe = false;
      controller.abort("END HOOK LIFECYCLE");
    };
  }, []);

  return { data: logs, countedLogs };
};
