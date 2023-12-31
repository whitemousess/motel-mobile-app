import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as provinceService from "~/service/provinceService";

function SelectProvince({ iconClear }) {
  const navigation = useNavigation();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const isOpen = () => {
    setModalVisible(true);
  };

  const [data, setData] = useState({
    province: "",
    district: "",
  });

  const onSubmit = () => {
    navigation.navigate("Home", {
      selectedProvince: data.province,
      selectedDistrict: data.district,
    });
    setModalVisible(false);
  };

  const clearSelect = () => {
    navigation.navigate("Home", {
      selectedProvince: "",
      selectedDistrict: "",
      reloadKey: Date.now(),
    });
    setData({ province: "", district: "" });
  };

  useEffect(() => {
    provinceService
      .getProvince()
      .then((result) => {
        setProvince(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const findProvince = () => {
      return province.filter((province) => province.name === data.province);
    };

    const foundProvince = findProvince();
    if (data.province && foundProvince.length > 0) {
      provinceService
        .getDistrict(foundProvince[0]?.code)
        .then((result) => {
          setDistrict(result.districts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data.province, province]);

  const handleSelect = (key, value) => {
    if (key === "province") {
      if (data.province !== value) {
        setData({ province: value, district: "" });
      }
      console.log(data.province);
    } else {
      setData({ ...data, [key]: value });
    }
  };

  return (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "rgba(0, 0, 0,0.1)",
      }}
    >
      <TouchableOpacity
        style={{
          width: "80%",
          height: 55,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 24,
        }}
        onPress={isOpen}
      >
        <AntDesign name="search1" size={24} color="#000" />
        <View style={{ marginLeft: 10 }}>
          <Text>Địa chỉ ?</Text>
          <Text style={{ color: "#717171" }}>
            {data.province && data.district
              ? `${data.province + " - " + data.district}`
              : "Tỉnh , thành phố"}
          </Text>
        </View>
      </TouchableOpacity>

      {iconClear && (
        <TouchableOpacity
          style={{
            width: "20%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={clearSelect}
        >
          <MaterialCommunityIcons
            name="delete-sweep-outline"
            size={28}
            color="black"
          />
        </TouchableOpacity>
      )}

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "80%",
              height: "35%",
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", padding: 10 }}>
              Tìm kiếm theo tỉnh thành
            </Text>

            <Picker
              selectedValue={data.province}
              itemStyle={{
                height: 70,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                marginBottom: 10,
              }}
              onValueChange={(value) => handleSelect("province", value)}
            >
              <Picker.Item label="Chọn tỉnh thành" value="" />
              {province.map((dataProvince) => (
                <Picker.Item
                  key={dataProvince.code}
                  label={dataProvince.name}
                  value={dataProvince.name}
                />
              ))}
            </Picker>

            <Picker
              selectedValue={data.district}
              itemStyle={{
                height: 70,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                marginBottom: 10,
              }}
              onValueChange={(value) => handleSelect("district", value)}
            >
              <Picker.Item label="Chọn quận huyện" value="" />
              {district.map((dataDistrict) => (
                <Picker.Item
                  key={dataDistrict.code}
                  label={dataDistrict.name}
                  value={dataDistrict.name}
                />
              ))}
            </Picker>
            <View
              style={{ flexDirection: "row", position: "absolute", bottom: 10 }}
            >
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: 30,
                  flex: 1,
                  alignItems: "center",
                }}
                onPress={onSubmit}
              >
                <Text>Tìm kiếm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "50%",
                  height: 30,
                  flex: 1,
                  alignItems: "center",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SelectProvince;
