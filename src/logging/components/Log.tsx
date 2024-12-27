import { LoggingEvent } from "../model";
import { LabelByLevel } from "./LabelByLevel";
import { useLoggingStyles } from "../hooks/useLoggingStyles";

export const Log = ({
  logEvent,
  onClick = () => Promise.resolve(),
}: {
  logEvent: LoggingEvent;
  onClick: (e: LoggingEvent) => Promise<void>;
}) => {
  const ctx = useLoggingStyles();
  return (
    <p
      className="grid grid-cols-log-template cursor-copy"
      onClick={async () => {
        await onClick(logEvent);
      }}
    >
      <span className="inline-block w-28">
        <LabelByLevel level={logEvent.level} />
      </span>
      <span className="inline-block mx-3">
        {logEvent.timestamp.toISOString()}
      </span>
      <span className="inline-block overflow-hidden">
        {ctx.formatJson ? (
          <pre>{JSON.stringify(logEvent.data)}</pre>
        ) : logEvent.type === "HTTP" ? (
          <>
            {logEvent.data.action} {logEvent.data.httpStatus}{" "}
            <a href="#">{logEvent.data.url}</a> - {logEvent.data.username}
          </>
        ) : (
          <>
            {logEvent.data.stantment} - {logEvent.data.clientIp}
          </>
        )}
      </span>
    </p>
  );
};
