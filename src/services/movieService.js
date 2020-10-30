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

export function deleteMovie(id) {
  return httpService.delete(`${url}/${id}`);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await httpService.put(`${url}/${movie._id}`, body);
  }

  return await httpService.post(url, movie);
}
