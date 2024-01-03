import { httpRequest } from "~/utils/httprequest";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import InputCustom from "~/components/InputCustom";
import ButtonCustom from "~/components/ButtonCustom";
import UploadImage from "~/components/UploadImage";

function User() {
  const [data, setData] = useState({
    password: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    imageUrl: "",
  });
  const [invalidFields, setInvalidFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetch = async () => {
    const currentUser = await AsyncStorage.getItem("currentUser");
    const userInfo = JSON.parse(currentUser);
    setData({
      fullName: userInfo.fullName,
      email: userInfo.email,
      address: userInfo.address,
      imageUrl: userInfo.imageUrl,
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
    setInvalidFields({ ...invalidFields, [key]: false });
  };

  const handleImageUpload = (imageUrl) => {
    setData({ ...data, imageUrl: imageUrl });
  };

  const handleData = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem("token");
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("imageUrl", {
      uri: data.imageUrl,
      type: "image/png", // Change to the actual image type
      name: "image.png", // Change to the actual image file name
    });

    await httpRequest
      .put(`user/edit`, formData, {
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
          AsyncStorage.setItem("currentUser", JSON.stringify(res.data.data));
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    if (!isLoading) {
      let newInvalidFields = {};

      Object.keys(data).forEach((key) => {
        if (data[key] === null || data[key].trim() === "") {
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

          <UploadImage onImageUpload={handleImageUpload} />

          <InputCustom
            label="Tên người dùng ..."
            value={data.fullName}
            onChange={(text) => handleChange("fullName", text)}
            isError={invalidFields["fullName"]}
          />

          <InputCustom
            label="Mật khẩu ..."
            password={true}
            value={data.password}
            onChange={(text) => handleChange("password", text)}
            isError={invalidFields["password"]}
          />

          <InputCustom
            label="Email ..."
            value={data.email}
            onChange={(text) => handleChange("email", text)}
            keyboardType="email-address"
            isError={invalidFields["email"]}
          />

          <InputCustom
            label="Số điện thoại ..."
            value={data.phone}
            onChange={(text) => handleChange("phone", text)}
            keyboardType="numeric"
            isError={invalidFields["phone"]}
          />
          <InputCustom
            label="Địa chỉ ..."
            value={data.address}
            onChange={(text) => handleChange("address", text)}
            isError={invalidFields["address"]}
          />

          <ButtonCustom
            label={isLoading ? "Đang Thay đổi" : "Thay đổi"}
            onPress={handleSubmit}
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

export default User;
