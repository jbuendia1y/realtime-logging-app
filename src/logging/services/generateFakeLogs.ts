import { HttpMethod, Level, LoggingEvent } from "../model";
import { FakeFavoriteUserMoviesTable } from "../../fake-data/sql-database";
import { LOGS_EVENT_ADDED_EVENT_NAME } from "../constants";
import {
  randomApiEndpointUrl,
  randomHttpStatusCode,
  randomIpAddress,
  randomUsername,
} from "../../fake-data/internet";
import { randomArrayItem, randomNumber } from "../../fake-data/basic";

const generateDatabaseFakeLog = (
  httpMethod: HttpMethod,
  httpStatusCode: number
): LoggingEvent => {
  let query = "";
  let response = "";
  const isErrorResponse = httpStatusCode >= 500;
  if (httpMethod === "GET") {
    query = FakeFavoriteUserMoviesTable.generateFakeQuery("SELECT");
    response = isErrorResponse
      ? "[UNKNOWN ERROR]: Cannot execute select query to " +
        FakeFavoriteUserMoviesTable.name
      : (query.includes("LIMIT")
          ? query.split("LIMIT ")[1].split(" ")[0]
          : randomNumber({ min: 25, max: 100 }).toString()) + " Rows fetched";
  } else if (httpMethod === "DELETE") {
    query = FakeFavoriteUserMoviesTable.generateFakeQuery("DELETE");
    response =
      (isErrorResponse
        ? "[UNKNOW ERROR]: Cannot delete row from "
        : "1 Row affected from ") + FakeFavoriteUserMoviesTable.name;
  } else if (httpMethod === "POST") {
    query = FakeFavoriteUserMoviesTable.generateFakeQuery("INSERT");
    response =
      (isErrorResponse
        ? "[UNKNOW ERROR]: Cannot insert row to "
        : "1 Row added to ") + FakeFavoriteUserMoviesTable.name;
  } else {
    query = FakeFavoriteUserMoviesTable.generateFakeQuery("UPDATE");
    response =
      (isErrorResponse
        ? "[UNKNOW ERROR]: Cannot update row from "
        : "1 Row affected to ") + FakeFavoriteUserMoviesTable.name;
  }

  return {
    type: "DATABASE",
    data: { clientIp: randomIpAddress(), response, stantment: query },
    timestamp: new Date(),
    level: isErrorResponse
      ? randomArrayItem([Level.ERROR, Level.FATAL])
      : randomArrayItem([Level.INFO, Level.DEBUG]),
  };
};

const generateHttpFakeLog = (): LoggingEvent => {
  const httpStatus = randomHttpStatusCode();
  const username = randomUsername();
  const url = randomApiEndpointUrl();

  let httpMethod: HttpMethod = randomArrayItem([
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ]);
  let level: Level = randomArrayItem([Level.DEBUG, Level.INFO]);
  if (httpStatus >= 400 && httpStatus < 500) {
    level = randomArrayItem([Level.ERROR, Level.WARN]);
    httpMethod = randomArrayItem(["POST", "PUT", "PATCH", "DELETE"]);
  } else if (httpStatus >= 500) {
    level = randomArrayItem([Level.ERROR, Level.FATAL]);
    httpMethod = randomArrayItem(["POST", "PUT", "PATCH", "DELETE"]);
  }

  return {
    type: "HTTP",
    level,
    data: {
      httpStatus,
      action: httpMethod,
      url,
      username,
    },
    timestamp: new Date(),
  };
};

export const generateFakeLogs = () => {
  const httpLog = generateHttpFakeLog();

  const dbLog = generateDatabaseFakeLog(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (httpLog.data as any).action,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (httpLog.data as any).httpStatus
  );

  window.dispatchEvent(
    new CustomEvent(LOGS_EVENT_ADDED_EVENT_NAME, {
      detail: dbLog,
    })
  );
  setTimeout(() => {
    window.dispatchEvent(
      new CustomEvent(LOGS_EVENT_ADDED_EVENT_NAME, {
        detail: httpLog,
      })
    );
  }, randomNumber({ min: 1, max: 5 }) * 1000);
};
