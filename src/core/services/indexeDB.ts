import { LoggingEvent } from "../../logging/model";

const getIndexedDB = (options: {
  onUpgradeNeeded: (db: IDBDatabase) => void;
}) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const dbRequest = indexedDB.open("app-realtime-logs-db", 1);
    dbRequest.onupgradeneeded = () => {
      options.onUpgradeNeeded(dbRequest.result);
    };
    dbRequest.onsuccess = () => {
      resolve(dbRequest.result);
    };
    dbRequest.onerror = (e) => {
      reject(
        new Error(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          "[ERROR - indexedDB request]: " + (e.target as any).error
        )
      );
    };
  });
};

export const saveLogInDB = async (data: LoggingEvent) => {
  const db = await getIndexedDB({
    onUpgradeNeeded: (db) => {
      const objectStore = db.createObjectStore("logs", {
        autoIncrement: false,
        keyPath: "id",
      });
      objectStore.createIndex("type", "type", { unique: false });
      objectStore.createIndex("data", "data", { unique: false });
      objectStore.createIndex("level", "level", { unique: false });
      objectStore.createIndex("timestamp", "timestamp", { unique: false });
    },
  });
  const transaction = db.transaction("logs", "readwrite");
  transaction.objectStore("logs").add({ ...data, id: crypto.randomUUID() });
  transaction.commit();
  db.close();
};
