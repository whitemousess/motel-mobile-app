import * as httpRequest from "~/utils/httprequest";

export const getAll = async () => {
  try {
    const res = await httpRequest.get("motel/get-all");
    return res;
  } catch (error) {
    return error;
  }
};
