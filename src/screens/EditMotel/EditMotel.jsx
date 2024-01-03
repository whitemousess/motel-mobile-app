import { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import InputCustom from "~/components/InputCustom";
import ButtonCustom from "~/components/ButtonCustom";
import * as provinceService from "~/service/provinceService";
import * as motelService from "~/service/motelService";

function EditMotel() {
  const route = useRoute();
  const motelId = route?.params?.motelId;
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    province: "",
    district: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [provinceSelect, setProvinceSelect] = useState([]);
  const [districtSelect, setDistrictSelect] = useState([]);
  const [invalidFields, setInvalidFields] = useState({});

  useEffect(() => {
    motelService
      .getMotelId({ motelId })
      .then((motel) => {
        setData(motel.data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, [motelId]);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
    setInvalidFields({ ...invalidFields, [key]: false });
  };

  useEffect(() => {
    provinceService
      .getProvince()
      .then((result) => {
        setProvinceSelect(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const findProvince = () => {
      return provinceSelect.filter(
        (province) => province.name === data.province
      );
    };

    const foundProvince = findProvince();
    if (data.province && foundProvince.length > 0) {
      provinceService
        .getDistrict(foundProvince[0]?.code)
        .then((result) => {
          setDistrictSelect(result.districts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data.province, provinceSelect]);

  const handleSelect = (key, value) => {
    if (key === "province") {
      if (data.province !== value) {
        setData({ ...data, province: value, district: "" });
      }
    } else {
      setData({ ...data, [key]: value });
    }
  };

  const handleData = () => {
    setIsLoading(true);
    motelService
      .editMotel({ motelId: data._id, data: data })
      .then((result) => {
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    if (!isLoading) {
      let newInvalidFields = {};

      Object.keys(data).forEach((key) => {
        if (data[key] === "") {
          newInvalidFields[key] = true;
        }
      });

      if (Object.keys(newInvalidFields).length === 0) {
        handleData();
      } else {
        setInvalidFields(newInvalidFields);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container}>
        <View style={styles.contentRegister}>
          <Text style={styles.Header}>Thay đổi thông tin</Text>

          <InputCustom
            label="Tiêu đề ..."
            value={data.title}
            onChange={(text) => handleChange("title", text)}
            isError={invalidFields["title"]}
          />
          <InputCustom
            label="Mô tả ..."
            value={data.description}
            onChange={(text) => handleChange("description", text)}
            isError={invalidFields["description"]}
          />
          <InputCustom
            label="Giá phòng ..."
            value={String(data.price)}
            keyboardType="numeric"
            onChange={(text) => handleChange("price", text)}
            isError={invalidFields["price"]}
          />

          <Picker
            selectedValue={data.province}
            itemStyle={{
              height: 80,
            }}
            onValueChange={(value) => handleSelect("province", value)}
          >
            <Picker.Item label="Chọn tỉnh thành" value="" />
            {provinceSelect.map((dataProvince) => (
              <Picker.Item
                key={dataProvince.code}
                label={dataProvince.name}
                value={dataProvince.name}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={data.district}
            itemStyle={{ height: 80 }}
            onValueChange={(value) => handleSelect("district", value)}
          >
            <Picker.Item label="Chọn quận huyện" value="" />
            {districtSelect.map((dataDistrict) => (
              <Picker.Item
                key={dataDistrict.code}
                label={dataDistrict.name}
                value={dataDistrict.name}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={data.type}
            itemStyle={{ height: 80 }}
            onValueChange={(value) => handleSelect("type", value)}
          >
            <Picker.Item label="Chọn loại" value="" />
            <Picker.Item label="Trọ sinh viên" value="Trọ sinh viên" />
            <Picker.Item label="Chung cư mini" value="Chung cư mini" />
          </Picker>

          <ButtonCustom
            onPress={handleSubmit}
            label={isLoading ? "Đang Thay đổi" : "Thay đổi"}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  imageRegister: {
    display: "flex",
    alignItems: "center",
  },

  contentRegister: {
    paddingRight: 20,
    paddingLeft: 20,
  },

  Header: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    paddingBottom: 30,
    paddingTop: 30,
    textAlign: "center",
  },
});

export default EditMotel;
