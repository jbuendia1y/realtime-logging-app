import { objectToIterable } from "../../utils";
import { useRealtimeLogs } from "../hooks/useRealtimeLogs";
import { getLogLevelFromString, Level } from "../model";
import { LabelByLevel } from "./LabelByLevel";

export const LogsCounter = () => {
  const { countedLogs } = useRealtimeLogs();

  return (
    <div className="flex flex-row gap-3 my-3">
      {objectToIterable<Level, bigint>(countedLogs, {
        transformKey: (key) => getLogLevelFromString(key),
      }).map((v) => {
        return (
          <p
            key={`count-${v.key}-label`}
            className="inline-flex items-center gap-2"
          >
            <LabelByLevel level={v.key} />
            {v.value.toString(10)}
          </p>
        );
      })}
    </div>
  );
};
