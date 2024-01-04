import { useCallback, useEffect, useState } from "react";

import ListMotel from "./ListMotel";
import * as motelService from "~/service/motelService";
import Toast from "react-native-toast-message";

function MyMotel() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetch();
    }, 1000);
  }, []);

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

  return (
    <ListMotel
      data={data}
      onDelete={deleteMotel}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

export default MyMotel;
