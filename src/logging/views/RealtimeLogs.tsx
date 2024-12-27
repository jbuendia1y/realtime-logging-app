import { RealtimeLogsList } from "../components/RealtimeLogsList";
import { useRealtimeLogs } from "../hooks/useRealtimeLogs";
import { LoggingStylesProvider } from "../contexts/LoggingStylesProvider";
import { LogsActions } from "../components/LogsActions";
import { LogsCounter } from "../components/LogsCounter";

export const RealtimeLogs = () => {
  const { data } = useRealtimeLogs();

  return (
    <div className="bg-slate-100 text-black p-3 font-bold dark:bg-slate-800 dark:text-white">
      <LoggingStylesProvider>
        <LogsActions />
        <LogsCounter />
        <RealtimeLogsList data={data} />
      </LoggingStylesProvider>
    </div>
  );
};
