import { useCallback, useEffect, useState } from "react";
import { useRoute, useFocusEffect } from "@react-navigation/native";

import SafeView from "~/components/SafeView";
import Search from "~/components/Search";
import MotelCard from "~/components/MotelCard";
import * as motelService from "~/service/motelService";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function Explore() {
  const route = useRoute();

  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [dataSelect, setDataSelect] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const selectedProvince = route.params?.selectedProvince || "";
  const selectedDistrict = route.params?.selectedDistrict || "";

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetch();
    }, 1000);
  }, []);

  useEffect(() => {
    setType("");
    onRefresh();
  }, [route.params?.reloadKey]);

  const fetch = () => {
    motelService
      .searchMotel({
        province: selectedProvince,
        district: selectedDistrict,
        type: type,
      })
      .then((result) => {
        setData(result);
      });
  };

  useEffect(() => {
    fetch();
    if (type || selectedDistrict || selectedProvince) {
      setDataSelect(true);
    } else {
      setDataSelect(false);
    }
  }, [type, selectedProvince, selectedDistrict]);

  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [])
  );

  return (
    <SafeView>
      <View style={{ height: "100%" }}>
        <Search iconClear={dataSelect} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 10,
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
              backgroundColor: type === "Trọ sinh viên" ? "#ccc" : null,
            }}
            onPress={() => setType("Trọ sinh viên")}
            activeOpacity={1}
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
              backgroundColor: type === "Chung cư mini" ? "#ccc" : null,
            }}
            onPress={() => setType("Chung cư mini")}
            activeOpacity={1}
          >
            <Text>Chung cư mini</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <MotelCard data={data} refreshing={refreshing} />
        </ScrollView>
      </View>
    </SafeView>
  );
}

export default Explore;
