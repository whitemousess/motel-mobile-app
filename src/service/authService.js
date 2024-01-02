import * as httpRequest from "~/utils/httprequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const login = async ({ data }) => {
  try {
    const res = await httpRequest.post(`user/login`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const register = async ({ data }) => {
  try {
    const res = await httpRequest.post(`user/register`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getUser = async ({ userId }) => {
  const token = await getToken();
  try {
    const res = await httpRequest.get(`user/get-user/${userId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};