import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import SafeView from "~/components/SafeView";
import Search from "~/components/Search/Search";
import MotelCard from "~/components/MotelCard";
import * as motelService from "~/service/motelService";
import { Text, TouchableOpacity, View } from "react-native";

function Explore() {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [type, setType] = useState("");

  const selectedProvince = route.params?.selectedProvince || "";
  const selectedDistrict = route.params?.selectedDistrict || "";

  useEffect(() => {
    motelService
      .searchMotel({
        province: selectedProvince,
        district: selectedDistrict,
        type: type,
      })
      .then((result) => {
        setData(result);
      });
  }, [type, selectedProvince, selectedDistrict]);
  return (
    <SafeView>
      <Search />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: "40%",
            height: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginRight: 20,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
          }}
          onPress={() => setType("Trọ sinh viên")}
        >
          <Text>Trọ sinh viên</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "40%",
            height: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 20,
          }}
          onPress={() => setType("Chung cư mini")}
        >
          <Text>Chung cư mini</Text>
        </TouchableOpacity>
      </View>

      <MotelCard data={data} />
    </SafeView>
  );
}

export default Explore;
