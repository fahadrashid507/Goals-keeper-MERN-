//axios is the react library version of postman - used to send GET, POST etc req through frontend
//do not confuse with node framework express that is used to handle above req at backend

import axios from "axios";

const API_URL = "https://goals-api-5oy0.onrender.com/api/users/";

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem("user");
};

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
