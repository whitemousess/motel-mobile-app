import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import MotelCard from "~/components/MotelCard";
import SafeView from "~/components/SafeView";

import * as motelService from "~/service/motelService";

function DetailProfile({ data }) {
  const [motel, setMotel] = useState([]);

  useEffect(() => {
    motelService
      .getMyMotel({ userId: data._id })
      .then((motel) => setMotel(motel.data))
      .catch((error) => console.log(error));
  }, [data]);

  return (
    <SafeView>
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingVertical: 20,
          }}
        >
          {data && (
            <Image
              source={{ uri: data.imageUrl }}
              style={{ width: "70%", height: 300, borderRadius: 999 }}
            />
          )}
          <Text style={{ marginVertical: 10, fontSize: 16, fontWeight: 500 }}>
            {data?.fullName}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 400 }}>
            Địa chỉ : {data?.address}
          </Text>
        </View>
        <MotelCard data={motel} />
      </ScrollView>
    </SafeView>
  );
}

export default DetailProfile;
