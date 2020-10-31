import config from "../config/config.json";
import httpService from "./httpService";

const url = `${config.apiEndPoint}genres`;

export function getGenres() {
  return httpService.get(url);
}
