import { HttpMethod } from "../logging/model";
import { randomArrayItem, randomNumber } from "./basic";

const HTTP_METHODS: Array<HttpMethod> = [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
];

const USERNAMES = [
  "aduthie0",
  "slimeburner1",
  "sgrollmann2",
  "aoffin3",
  "rgibby4",
  "agreen5",
  "mledgley6",
  "equin7",
  "fodoohaine8",
  "mclowton9",
]; // generated from https://mockaroo.com/;

const EXAMPLE_API_URL = "https://api.example.com/api/v1/";

export const randomApiEndpointUrl = () =>
  EXAMPLE_API_URL.concat("resource") +
  randomNumber({ min: 1, max: 10 }).toString();

export const randomUsername = () => randomArrayItem(USERNAMES);
export const randomHttpMethod = () => randomArrayItem(HTTP_METHODS);

export const randomHttpStatusCode = () => randomNumber({ min: 100, max: 599 });

export const randomIpAddress = () => {
  const getRandomOctet = () => Math.floor(Math.random() * 256);
  return `${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}`;
};
