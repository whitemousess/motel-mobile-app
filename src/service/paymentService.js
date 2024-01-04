import { httpRequest } from "~/utils/httprequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const createUrlVnPay = async ({ data }) => {
  const token = await getToken();
  try {
    const res = httpRequest.post(`payment/create_payment_vnpay`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const callbackVnPay = async ({ param }) => {
  const token = await getToken();
  try {
    const res = httpRequest.post(`payment/vnpay_callback`, param, {
      headers: { authorization: "Bearer " + token },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const successVnPay = async ({ id }) => {
  const token = await getToken();
  try {
    const res = httpRequest.get(`booked/success-payment/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    return res;
  } catch (error) {
    return error;
  }
};
