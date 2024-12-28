import { LoggingEvent } from "../logging/model";

export const JsonLogDetail = ({ logEvent }: { logEvent: LoggingEvent }) => {
  const details = logEvent.data;
  const entries = Object.entries(details);

  return (
    <code>
      <span className="text-yellow-600 dark:text-yellow-500">{"{ "}</span>
      {entries.map(([key, value], idx) => {
        const valueIsNumber = Number.isInteger(value);
        const isTheLastItem = idx === entries.length - 1;
        return (
          <span key={`json-item-${key}-in-idx-${idx}`}>
            <span className="text-cyan-700 dark:text-cyan-500">"{key}"</span>:{" "}
            <span
              className={`${
                valueIsNumber
                  ? "text-green-700 dark:text-green-500"
                  : "text-orange-700 dark:text-orange-500"
              }`}
            >
              {valueIsNumber ? value : `"${value}"`}
            </span>
            {isTheLastItem ? " " : ", "}
          </span>
        );
      })}
      <span className="text-yellow-600 dark:text-yellow-500">{" }"}</span>
    </code>
  );
};
