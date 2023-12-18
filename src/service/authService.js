import * as httpRequest from "~/utils/httprequest";

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
