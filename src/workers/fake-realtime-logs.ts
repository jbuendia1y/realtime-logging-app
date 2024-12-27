/* import { faker } from "@faker-js/faker";
import { generateFakeLogs } from "../logging/services/generateFakeLogs";

self.addEventListener("install", () => {
  const wrapper = () => {
    setTimeout(() => {
      const { dbLog, httpLog } = generateFakeLogs();
      postMessage(dbLog);
      setTimeout(() => {
        postMessage(httpLog);
      }, faker.number.int({ min: 1, max: 3 }) * 1000);

      wrapper();
    }, faker.number.int({ min: 1, max: 3 }) * 1000);
  };
  wrapper();
});
 */
