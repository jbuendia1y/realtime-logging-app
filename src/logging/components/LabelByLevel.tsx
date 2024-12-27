import { memo } from "react";
import { Level, LevelStr } from "../model";

const LevelColor: Record<Level, { background: string; color: string }> = {
  [Level.DEBUG]: {
    background: "#007bb2",
    color: "white",
  },
  [Level.INFO]: {
    background: "#1769aa",
    color: "white",
  },
  [Level.WARN]: {
    background: "#ffea00",
    color: "black",
  },
  [Level.ERROR]: {
    background: "#ff1744",
    color: "white",
  },
  [Level.FATAL]: {
    background: "#aa2e25",
    color: "white",
  },
};
/* 
.log-label {
  display: inline-block;
  max-width: 100px;
  width: 100%;
  padding: 3.5px 15px;

  border-radius: 2px;
  font-weight: bold;
  text-align: center;
}
*/
export const LabelByLevel = memo(function LabelByLevel({
  level,
}: {
  level: Level;
}) {
  const displayText = LevelStr[level];
  const levelColor = LevelColor[level];

  return (
    <span
      className="inline-block max-w-28 w-full py-2 px-4 rounded-sm font-bold text-center"
      style={{
        backgroundColor: levelColor.background,
        color: levelColor.color,
      }}
    >
      {displayText}
    </span>
  );
});
