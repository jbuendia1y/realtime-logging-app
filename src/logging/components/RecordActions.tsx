import {
  MdDownloadForOffline,
  // MdFiberManualRecord,
  MdOutlinePlayCircleFilled,
  MdPauseCircle,
} from "react-icons/md";
import { useRecordStreamLogs } from "../hooks/useRecordStreamLogs";
import { useSnackbar } from "../../core/hooks/useSnackbar";
export const RecordActions = () => {
  const { isRecording, startRecord, pauseRecord, download } =
    useRecordStreamLogs();
  const { show } = useSnackbar();

  return (
    <div className="text-3xl">
      {isRecording ? (
        <button
          aria-label="pause-record"
          onClick={() => {
            pauseRecord();
            show({ variant: "info", message: "Recording paused" });
          }}
        >
          <MdPauseCircle />
        </button>
      ) : (
        <button
          aria-label="start-record"
          onClick={() => {
            startRecord();
            show({ variant: "info", message: "Start recording" });
          }}
          className="inline-block mx-1"
        >
          <MdOutlinePlayCircleFilled />
        </button>
      )}

      <button
        aria-label="download-records"
        onClick={async () => {
          show({
            variant: "info",
            message: "Starting download ...",
            duration: 1.5,
          });
          await download();
          show({
            variant: "success",
            message: "Download complete",
            duration: 3.5,
          });
        }}
      >
        <MdDownloadForOffline />
      </button>
    </div>
  );
};
