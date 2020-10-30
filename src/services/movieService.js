import config from "../config/config.json";
import httpService from "./httpService";

const url = `${config.apiEndPoint}movies`;

export async function getMovies() {
  const { data } = await httpService.get(url);
  return data;
}

export async function getMovie(id) {
  const { data } = await httpService.get(`${url}/${id}`);
  return data;
}

export async function deleteMovie(id) {
  const { data } = await httpService.delete(`${url}/${id}`);
  return data;
}

export function saveMovie(movie) {
  console.log("save toto", movie);
  return movie;
}
