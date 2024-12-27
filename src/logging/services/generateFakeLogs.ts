import { faker } from "@faker-js/faker";
import { Level, LoggingEvent } from "../model";
import { FakeFavoriteUserMoviesTable } from "../../fake-data/sql-database";
import { LOGS_EVENT_ADDED_EVENT_NAME } from "../constants";

type HttpMethod = ReturnType<typeof faker.internet.httpMethod>;

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
          : faker.number.int({ min: 25, max: 100 }).toString()) +
        " Rows fetched";
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
    data: { clientIp: faker.internet.ip(), response, stantment: query },
    timestamp: new Date(),
    level: isErrorResponse
      ? faker.helpers.arrayElement([Level.ERROR, Level.FATAL])
      : faker.helpers.arrayElement([Level.INFO, Level.DEBUG]),
  };
};

const generateHttpFakeLog = (): LoggingEvent => {
  const httpStatus = faker.internet.httpStatusCode();
  const username = faker.internet.username();
  const url = faker.internet.url();

  let httpMethod: HttpMethod = faker.helpers.arrayElement([
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
  ]);
  let level: Level = faker.helpers.arrayElement([Level.DEBUG, Level.INFO]);
  if (httpStatus >= 400 && httpStatus < 500) {
    level = faker.helpers.arrayElement([Level.ERROR, Level.WARN]);
    httpMethod = faker.helpers.arrayElement(["POST", "PUT", "PATCH", "DELETE"]);
  } else if (httpStatus >= 500) {
    level = faker.helpers.arrayElement([Level.ERROR, Level.FATAL]);
    httpMethod = faker.helpers.arrayElement(["POST", "PUT", "PATCH", "DELETE"]);
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
  }, faker.number.int({ min: 1, max: 5 }) * 1000);
};
