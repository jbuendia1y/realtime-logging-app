import { faker } from "@faker-js/faker";

const FAKE_SELECT_STANTMENTS = [
  {
    type: "select",
    query: "SELECT %cols% FROM %table%",
    compute(values: { columns: string[]; tableName: string }) {
      return this.query
        .replace("%cols%", values.columns.join(", "))
        .replace("%table%", values.tableName);
    },
  },
  {
    type: "select-with-conditions",
    query: "SELECT %cols% FROM %table% WHERE %conditions%",
    compute(values: {
      columns: string[];
      tableName: string;
      filters: Record<string, string>;
    }) {
      const computeFilters = Object.entries(values.filters)
        .map(([key, value]) => `${key} ${value}`)
        .join(", ");

      return this.query
        .replace("%cols%", values.columns.join(", "))
        .replace("%table%", values.tableName)
        .replace("%conditions%", computeFilters);
    },
  },
  {
    type: "select-with-cursor-pagination",
    query:
      "SELECT %cols% FROM %table% WHERE %conditions% ORDER BY %order% LIMIT %limit%",
    compute(values: {
      columns: string[];
      tableName: string;
      order: [string, string];
      limit: number;
      filters: Record<string, string>;
    }) {
      const computeFilters = Object.entries(values.filters)
        .map(([key, value]) => `${key} ${value}`)
        .join(", ");

      return this.query
        .replace("%cols%", values.columns.join(", "))
        .replace("%table%", values.tableName)
        .replace("%order%", values.order.join(" "))
        .replace("%limit%", values.limit.toString(10))
        .replace("%conditions%", computeFilters);
    },
  },
];

const FAKE_UPDATE_STANTMENTS = [
  {
    type: "update",
    query: "UPDATE %table% SET %values% WHERE %conditions%",
    compute(values: {
      tableName: string;
      newValues: Record<string, string>;
      filters: Record<string, string>;
    }) {
      const computeFilters = Object.entries(values.filters)
        .map(([key, value]) => `${key} = ${value}`)
        .join(", ");
      const computeNewValues = Object.entries(values.newValues)
        .map(([key, value]) => `${key} = ${value}`)
        .join(", ");

      return this.query
        .replace("%table%", values.tableName)
        .replace("%values%", computeNewValues)
        .replace("%conditions%", computeFilters);
    },
  },
];
const FAKE_INSERT_STANTMENTS = [
  {
    type: "insert",
    query: "INSERT INTO %table%(%columns%) VALUES (%values%)",
    compute(values: {
      tableName: string;
      columns: string[];
      data: Record<string, string>;
    }) {
      const computeData = Object.entries(values.data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_key, value]) => value)
        .join(", ");

      return this.query
        .replace("%table%", values.tableName)
        .replace("%columns%", values.columns.join(", "))
        .replace("%values%", computeData);
    },
  },
];

const FAKE_DELETE_STANTMENTS = [
  {
    type: "delete",
    query: "DELETE FROM %table% WHERE %conditions%",
    compute(values: { tableName: string; filters: Record<string, string> }) {
      const computeFilters = Object.entries(values.filters)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_key, value]) => value)
        .join(", ");

      return this.query
        .replace("%table%", values.tableName)
        .replace("%conditions%", computeFilters);
    },
  },
];

interface FakeSQLTable {
  name: string;
  columns: string[];
  generateFakeQuery(
    queryType: "SELECT" | "INSERT" | "UPDATE" | "DELETE"
  ): string;
}

const generateFakeSqlUUID = () => `"${crypto.randomUUID()}"`;

export const FakeFavoriteUserMoviesTable: FakeSQLTable = {
  name: "movies",
  columns: ["id", "userId", "movieId", "timestamp", "stars"],
  generateFakeQuery(queryType) {
    switch (queryType) {
      case "SELECT": {
        return faker.helpers.arrayElement(FAKE_SELECT_STANTMENTS)?.compute({
          tableName: this.name,
          columns: this.columns,
          ...{
            limit: faker.number.int({ min: 25, max: 100 }).toString(),
            filters: {
              timestamp: `> ${new Date().toISOString()}`,
            },
            order: ["timestamp", "ASC"],
          },
        });
      }
      case "UPDATE": {
        return faker.helpers.arrayElement(FAKE_UPDATE_STANTMENTS)?.compute({
          tableName: this.name,
          filters: { id: generateFakeSqlUUID() },
          newValues: {
            stars: faker.number.int({ min: 1, max: 5 }).toString(10),
          },
        });
      }
      case "INSERT": {
        return faker.helpers.arrayElement(FAKE_INSERT_STANTMENTS)?.compute({
          tableName: this.name,
          columns: this.columns,
          data: {
            id: generateFakeSqlUUID(),
            userId: generateFakeSqlUUID(),
            movieId: generateFakeSqlUUID(),
            timestamp: new Date().toISOString(),
            stars: faker.number.int({ min: 1, max: 5 }).toString(10),
          },
        });
      }
      case "DELETE": {
        return faker.helpers
          .arrayElement(
            FAKE_DELETE_STANTMENTS.filter((v) => v.type.includes("delete"))
          )
          ?.compute({
            tableName: this.name,
            filters: { id: generateFakeSqlUUID() },
          });
      }
      default: {
        return faker.helpers.arrayElement(FAKE_SELECT_STANTMENTS)?.compute({
          tableName: this.name,
          columns: this.columns,
          ...{
            limit: faker.number.int({ min: 25, max: 100 }).toString(),
            filters: {
              timestamp: `> ${new Date().toISOString()}`,
            },
            order: ["timestamp", "ASC"],
          },
        });
      }
    }
  },
};
