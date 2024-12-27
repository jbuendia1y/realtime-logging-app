import { faker } from "@faker-js/faker";

export enum Level {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export const getLogLevelFromString = (key: string): Level | undefined => {
  return LevelInt[parseInt(key)];
};

export const LevelInt: Record<number, Level> = {
  [Level.DEBUG]: Level.DEBUG,
  [Level.INFO]: Level.INFO,
  [Level.WARN]: Level.WARN,
  [Level.ERROR]: Level.ERROR,
  [Level.FATAL]: Level.FATAL,
};

export const LevelStr: Record<Level, string> = {
  [Level.DEBUG]: "DEBUG",
  [Level.INFO]: "INFO",
  [Level.WARN]: "WARN",
  [Level.ERROR]: "ERROR",
  [Level.FATAL]: "FATAL",
};

export interface HttpLogEventData {
  username: string;
  url: string;
  action: ReturnType<typeof faker.internet.httpMethod>;
  httpStatus: number;
}

export interface DatabaseLogEventData {
  stantment: string;
  response: string;
  clientIp: string;
}

export type LoggingEvent =
  | {
      type: "HTTP";
      timestamp: Date;
      level: Level;
      data: HttpLogEventData;
    }
  | {
      type: "DATABASE";
      timestamp: Date;
      level: Level;
      data: DatabaseLogEventData;
    };
