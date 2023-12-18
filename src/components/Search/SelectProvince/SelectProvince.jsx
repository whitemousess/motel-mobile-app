import { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

import * as provinceService from "~/service/provinceService";

function SelectProvince() {
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
    navigation.navigate("Explore", {
      selectedProvince: data.province.split(",")[1],
      selectedDistrict: data.district,
    });
    setModalVisible(false);
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
    if (data.province) {
      provinceService
        .getDistrict(data.province[0])
        .then((result) => {
          setDistrict(result.districts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data.province]);

  const handleSelect = (key, value) => {
    if (key === "province" && data.province !== value) {
      setData({ province: value, district: "" });
    } else {
      setData({ ...data, [key]: value });
    }
  };

  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <TouchableOpacity
        style={{
          width: "100%",
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
          <Text style={{ color: "#717171" }}>Tỉnh , thành phố</Text>
        </View>
      </TouchableOpacity>

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
              height: "50%",
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "center", padding: 10 }}>
              Tìm kiếm theo tỉnh thành
            </Text>

            <Picker
              selectedValue={data.province}
              itemStyle={{ height: 60 }}
              onValueChange={(value) => handleSelect("province", value)}
            >
              <Picker.Item label="Chọn tỉnh thành" value="" />
              {province.map((dataProvince) => (
                <Picker.Item
                  key={dataProvince.code}
                  label={dataProvince.name}
                  value={[dataProvince.code, dataProvince.name]}
                />
              ))}
            </Picker>

            <Picker
              selectedValue={data.district}
              itemStyle={{ height: 60 }}
              onValueChange={(value) => handleSelect("district", value)}
            >
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
