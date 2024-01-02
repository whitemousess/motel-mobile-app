import * as httpRequest from "~/utils/httprequest";

export const getAll = async () => {
  try {
    const res = await httpRequest.get("motel/get-all");
    return res;
  } catch (error) {
    return error;
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
    return res;
  } catch (error) {
    return error;
  }
};

export const getMyMotel = async ({ userId }) => {
  try {
    const res = await httpRequest.get(`motel/motel-user/${userId}`);
    return res;
  } catch (error) {
    return error;
  }
};
