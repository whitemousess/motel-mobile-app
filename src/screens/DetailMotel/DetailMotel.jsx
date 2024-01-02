import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { View } from "react-native";
import SafeView from "~/components/SafeView";
import Search from "~/components/Search";
import * as motelServices from "~/service/motelService";
import Item from "./InfoItem";
import ClientEmpty from "~/components/ClientEmpty";

function DetailMotel() {
  const route = useRoute();
  const motelId = route?.params.motelId;

  const [data, setData] = useState({});

  useEffect(() => {
    motelServices
      .getMotelId({ motelId })
      .then((motel) => setData(motel.data))
      .catch((error) => console.log(error));
  }, [motelId]);

  if (!data) {
    return (
      <ClientEmpty
        title="Không có thông tin phòng trọ"
        description="Chưa có thông tin"
      />
    );
  }

  return (
    <SafeView>
      <View style={{ height: "100%" }}>
        <Search />

        <Item data={data} />
      </View>
    </SafeView>
  );
}

export default DetailMotel;
