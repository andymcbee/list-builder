import axios from "axios";

const API_URL = "/api/users/";

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "create", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  return response.data.result;
};

//Signin user
const signin = async (userData) => {
  const response = await axios.post(API_URL + "signin", userData);

  //store JWT in local storage
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  // return user info to Redux store
  return response.data.result;
};

// Get user with valid JWT token

const fetchUser = async (jwtToken) => {
  //  console.log(jwtToken);
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  console.log("PRE-RESPONSE in auth service");

  try {
    const response = await axios.post(API_URL, null, config);
    console.log(response.data.result);

    return response.data.result;
  } catch (error) {
    console.log(error);
    return localStorage.removeItem("user");
  }
};

//Logout user

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = { register, signin, logout, fetchUser };

export default authService;
