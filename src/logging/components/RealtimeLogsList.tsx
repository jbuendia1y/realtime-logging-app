import { useSnackbar } from "../../core/hooks/useSnackbar";
import { Level, LoggingEvent } from "../model";
import { Log } from "./Log";
import { Skeleton } from "./Skeleton";

export const RealtimeLogsList = ({
  data,
  maxItems = 10,
}: {
  data: LoggingEvent[];
  maxItems?: number;
}) => {
  const { show } = useSnackbar();
  const hasEnoughData = data.length - maxItems === 0;

  const handleClick = async (e: LoggingEvent) => {
    await navigator.clipboard.writeText(JSON.stringify(e, null, 2));
    show({ message: e.type + " Log copied!", variant: "info", duration: 1 });
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map((v) => (
        <Log key={crypto.randomUUID()} logEvent={v} onClick={handleClick} />
      ))}
      {!hasEnoughData
        ? Array.from({ length: maxItems - data.length }, (_, idx) => idx).map(
            () => (
              <Skeleton key={crypto.randomUUID()}>
                <Log
                  onClick={() => Promise.resolve()}
                  logEvent={{
                    type: "HTTP",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data: {} as any,
                    level: Level.DEBUG,
                    timestamp: new Date(),
                  }}
                />
              </Skeleton>
            )
          )
        : null}
    </div>
  );
};
