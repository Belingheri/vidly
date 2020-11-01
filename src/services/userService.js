import config from "../config/config.json";
import httpService from "./httpService";

const url = `${config.apiEndPoint}users`;

export function register(user) {
  return httpService.post(url, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
