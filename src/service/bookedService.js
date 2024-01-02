import { httpRequest } from "~/utils/httprequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const getMyBooked = async () => {
  const token = await getToken();
  try {
    const res = await httpRequest.get(`booked/my-booked`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const bookedMotel = async ({ id }) => {
  const token = await getToken();
  try {
    const res = await httpRequest.get(`booked/${id}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const cancelBooked = async ({ id }) => {
  const token = await getToken();
  
  try {
    const res = await httpRequest.delete(`booked/${id}/cancel`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res;
  } catch (error) {
    return error;
  }
};
