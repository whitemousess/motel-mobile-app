import { useEffect, useState } from "react";

import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import UploadImage from "./UploadImage";
import InputCustom from "~/components/InputCustom";
import ButtonCustom from "~/components/ButtonCustom";
import * as provinceService from "~/service/provinceService";
import { httpRequest } from "~/utils/httprequest";
import SafeView from "~/components/SafeView";

function PostItem() {
  const [invalidFields, setInvalidFields] = useState({});
  const [provinceSelect, setProvinceSelect] = useState([]);
  const [districtSelect, setDistrictSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    province: "",
    district: "",
    type: "",
    imageUrl: "",
  });

  const handleSelect = (key, value) => {
    if (key === "province") {
      if (data.province !== value) {
        setData({ ...data, province: value, district: "" });
      }
    } else {
      setData({ ...data, [key]: value });
    }
  };

  const handleChange = (key, value) => {
    if (value.trim() === "") {
      setData({ ...data, [key]: "" });
    } else {
      setData({ ...data, [key]: value });
      setInvalidFields({ ...invalidFields, [key]: false });
    }
  };

  const handleImageUpload = (imageUrl) => {
    setData({ ...data, imageUrl });
  };

  const handleData = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("province", data.province);
    formData.append("district", data.district);
    formData.append("type", data.type);
    if (data.imageUrl) {
      for (let i = 0; i < data.imageUrl.length; i++) {
        formData.append("images", {
          uri: data.imageUrl[i],
          type: "image/png",
          name: "image.png",
        });
      }
    }

    try {
      await httpRequest
        .post(`motel/create-motel`, formData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              type: "success",
              text1: "Thay đổi thành công",
            });
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
        Toast.show({
          type: "error",
          text1: "Dữ liệu chưa đủ",
          text2: "Vui lòng nhập thêm",
        });
        setInvalidFields(newInvalidFields);
      }
    }
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

  return (
    <SafeView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.contentRegister}>
          <Text style={styles.Header}>Cho thuê phòng</Text>

          <UploadImage onImageUpload={handleImageUpload} />

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
            value={data.price}
            keyboardType={"numeric"}
            onChange={(text) => handleChange("price", text)}
            isError={invalidFields["price"]}
          />

          <Picker
            selectedValue={data.province}
            itemStyle={{
              height: 100,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              marginBottom: 10,
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
            itemStyle={{
              height: 100,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              marginBottom: 10,
            }}
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
            itemStyle={{
              height: 100,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              marginBottom: 10,
            }}
            onValueChange={(value) => handleSelect("type", value)}
          >
            <Picker.Item label="Chọn loại" value="" />
            <Picker.Item label="Trọ sinh viên" value="Trọ sinh viên" />
            <Picker.Item label="Chung cư mini" value="Chung cư mini" />
          </Picker>

          <ButtonCustom
            label={isLoading ? "Đang xử lý" : "Thêm"}
            onPress={handleSubmit}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeView>
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
    textAlign: "center",
  },
});

export default PostItem;
