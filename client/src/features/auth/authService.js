import axios from "axios";

const API_URL = "/api/users/";

//Register user
//I'll need to modify the API url below... and add "signup" or whatever was used
const register = async (userData) => {
  const response = await axios.post(API_URL + "create", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Signin user
const signin = async (userData) => {
  const response = await axios.post(API_URL + "signin", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, signin, logout };

export default authService;
