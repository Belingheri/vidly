import jwtDecode from "jwt-decode";

import config from "../config/config.json";
import httpService from "./httpService";

const url = `${config.apiEndPoint}auth`;
const tokenName = "token";

export async function login(email, password) {
  try {
    const { data: token } = await httpService.post(url, {
      email,
      password,
    });
    loginWithJwt(token);
  } catch (error) {
    throw error;
  }
}

export function loginWithJwt(token) {
  localStorage.setItem(tokenName, token);
}

export function logout() {
  localStorage.removeItem(tokenName);
}
export function getcurrentUser() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem("token");
}
