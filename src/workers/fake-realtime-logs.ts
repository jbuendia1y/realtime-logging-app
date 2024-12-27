/* import { faker } from "@faker-js/faker";
import { generateFakeLogs } from "../logging/services/generateFakeLogs";

self.addEventListener("install", () => {
  const wrapper = () => {
    setTimeout(() => {
      const { dbLog, httpLog } = generateFakeLogs();
      postMessage(dbLog);
      setTimeout(() => {
        postMessage(httpLog);
      }, randomNumber({ min: 1, max: 3 }) * 1000);

      wrapper();
    }, randomNumber({ min: 1, max: 3 }) * 1000);
  };
  wrapper();
});
 */
