import axios from "axios";

const apiVietNam = "https://provinces.open-api.vn/api/";

export const getProvince = async () => {
  try {
    const res = await axios.get(apiVietNam);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDistrict = async (code) => {
  try {
    const res = await axios.get(`${apiVietNam}p/${code}?depth=2`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
