import { httpRequest } from "~/utils/httprequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    return null;
  }
};

export const getAllFavorite = async () => {
  const token = await getToken();

  try {
    const res = await httpRequest.get("favorite/motel-my-liked", {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addFavorite = async ({ motelId }) => {
  const token = await getToken();
  const res = httpRequest.post(
    "favorite/liked",
    { motelId },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return res;
};

export const deleteFavorite = async ({ id }) => {
  const token = await getToken();
  const res = httpRequest.delete(`favorite/unLiked/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
  return res;
};
