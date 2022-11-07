import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/";
let Token = localStorage.getItem("token");

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: Token,
  },
};

/*-----------------User Signup-----------------*/
export const userSignup = async (data) => {
  try {
    const response = await axios.post(
      API_URL + "user/userSignup",
      data,
      axiosConfig
    );

    if (response.data.status) {
      setDataAfterUserLogin(response);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

/*----------------------User Login-----------------------*/
export const userLogin = async (data) => {
  const response = await axios.post(
    API_URL + "user/userLogin",
    data,
    axiosConfig
  );

  if (response.data.status) {
    setDataAfterUserLogin(response);
  }

  return response;
};

/*-----------------------User Logout------------------------*/
export const userLogout = () => {
  localStorage.clear();
  toast.success("Logout Successfull");
};

/*-----------------------User Update---------------------------*/
export const userUpdate = async (user) => {
  const updatedResponse = await axios.post(
    API_URL + "user/updateUser",
    user,
    axiosConfig
  );

  if (updatedResponse.data.status) {
    localStorage.setItem("user", JSON.stringify(updatedResponse.data.result));
    toast.success(updatedResponse.data.message);
  } else {
    toast.error(updatedResponse.data.message);
  }
  return updatedResponse;
};

/*-----------------set data after user login-----------------*/
const setDataAfterUserLogin = (response) => {
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.result));
  localStorage.setItem("isLoggedIn", JSON.stringify(true));
};
