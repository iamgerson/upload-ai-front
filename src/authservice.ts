import axios from "axios";
import { BACKEND_URL } from "utils/system";
import 'services/authinterceptor'

async function login(username: string, password: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}auth/signin`, {
      username,
      password
    });

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify({ token: response.data.accessToken }));
    }
    return response.data;
  } catch (error) {
    // Trate o erro de alguma forma apropriada, como registrar ou notificar
    console.error("Erro durante o login:", error);
    throw error;
  }
}

function logout() {
  localStorage.removeItem("user");
}

async function register(username: string, email: string, password: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}auth/signup`, {
      username,
      email,
      password
    });

    return response.data;
  } catch (error) {
    // Trate o erro de alguma forma apropriada, como registrar ou notificar
    console.error("Erro durante o registro:", error);
    throw error;
  }
}

function getCurrentUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}


export default { login, logout, register, getCurrentUser };