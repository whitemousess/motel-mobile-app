import { useCallback, useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import MotelCard from "~/components/MotelCard";
import SafeView from "~/components/SafeView";

import * as motelService from "~/service/motelService";

function DetailProfile({ data }) {
  const [motel, setMotel] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = () => {
    motelService
      .getMotelUser({ userId: data._id })
      .then((motel) => setMotel(motel.data))
      .catch((error) => console.log(error));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetch();
    }, 1000);
  }, [data]);

  useEffect(() => {
    fetch();
  }, [data]);

  return (
    <SafeView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingVertical: 20,
            marginBottom: 20,
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
