import { VscJson } from "react-icons/vsc";
import { useLoggingStyles } from "../hooks/useLoggingStyles";
import { ThemeButton } from "../../core/components/ThemeButton";
import { RecordActions } from "./RecordActions";

export const LogsActions = () => {
  const { formatJson, toggleFormat } = useLoggingStyles();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-3">
        <button
          onClick={() => toggleFormat()}
          className={
            "flex flex-row gap-2 p-2 px-3 rounded-sm " +
            (formatJson
              ? "bg-slate-300 dark:bg-slate-500"
              : "bg-slate-400 dark:bg-slate-600")
          }
        >
          <VscJson aria-label="json" size="25px" />
          JSON Format
        </button>
        <RecordActions />
      </div>

      <ThemeButton />
    </div>
  );
};
