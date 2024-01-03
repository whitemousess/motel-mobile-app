import { useEffect, useState } from "react";

import ListMotel from "./ListMotel";
import * as motelService from "~/service/motelService";
import Toast from "react-native-toast-message";

function MyMotel() {
  const [data, setData] = useState([]);

  const fetch = () => {
    motelService
      .getMyMotel()
      .then((motel) => {
        setData(motel.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  const deleteMotel = (motelId) => {
    motelService
      .deleteMotel({ motelId })
      .then((motel) => {
        if (motel.status == 200) {
          fetch();
          Toast.show({
            type: "success",
            text1: "xóa thành công",
          });
        } else if (motel.response.status == 400) {
          Toast.show({
            type: "error",
            text1: "Phòng đang có người chưa thanh toán",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <ListMotel data={data} onDelete={deleteMotel} />;
}

export default MyMotel;
