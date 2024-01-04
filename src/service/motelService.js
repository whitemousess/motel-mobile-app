import { httpRequest } from "~/utils/httprequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const searchMotel = async ({ district, province, type }) => {
  try {
    const res = await httpRequest.get("motel/search-motel", {
      params: {
        district,
        province,
        type,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMotelId = async ({ motelId }) => {
  try {
    const res = await httpRequest.get(`motel/get-motel/${motelId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMotelUser = async ({ userId }) => {
  try {
    const res = await httpRequest.get(`motel/motel-user/${userId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMyMotel = async () => {
  const token = await getToken();
  try {
    const res = await httpRequest.get(`motel/my-motel`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postMotel = async ({ data }) => {
  const token = await getToken();
  const formData = await data;
  try {
    return formData;
    //   const res = await httpRequest.post(`motel/create-motel`, formData, {
    //     headers: { Authorization: "Bearer " + token },
    //   });
    //   return res;
  } catch (error) {
    return error.response;
  }
};

export const deleteMotel = async ({ motelId }) => {
  const token = await getToken();
  try {
    const res = await httpRequest.delete(`motel/delete-motel/${motelId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const editMotel = async ({ motelId, data }) => {
  const token = await getToken();
  try {
    const res = await httpRequest.put(`motel/edit-motel/${motelId}`, data, {
      headers: { Authorization: "Bearer " + token },
    });
    return res;
  } catch (error) {
    return error;
  }
};
