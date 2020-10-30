import config from "../config/config.json";
import httpService from "./httpService";

const url = `${config.apiEndPoint}genres`;

export async function getGenres() {
  const { data } = await httpService.get(url);
  return data;
}
