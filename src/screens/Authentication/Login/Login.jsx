import { useContext, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import Logo from "~/components/assets/LOGO.png";
import InputCustom from "~/components/InputCustom";
import ButtonCustom from "~/components/ButtonCustom";
import { AuthContext } from "~/context/AuthContext";
import SafeView from "~/components/SafeView";

function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [invalidFields, setInvalidFields] = useState({});

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value.trim() });
    setInvalidFields({ ...invalidFields, [key]: false });
  };

  const handleSubmit = () => {
    let newInvalidFields = {};
    Object.keys(data).forEach((key) => {
      if (data[key].trim() === "") {
        newInvalidFields[key] = true;
      }
    });

    if (Object.keys(newInvalidFields).length === 0) {
      login(data);
    } else {
      setInvalidFields(newInvalidFields);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeView style={styles.container}>
        <View style={styles.imageLogin}>
          <Image style={{ width: 100, height: 100 }} source={Logo} />
        </View>
        <View style={styles.contentLogin}>
          <Text style={styles.Header}>Đăng nhập</Text>
          <InputCustom
            label="Tài khoản ..."
            value={data.username}
            onChange={(text) => handleChange("username", text)}
            icon={
              <MaterialIcons
                name="person"
                size={28}
                color={`${invalidFields["username"] ? "red" : "#666"}`}
              />
            }
            isError={invalidFields["username"]}
          />

          <InputCustom
            label="Mật khẩu ..."
            password={true}
            value={data.password}
            onChange={(text) => handleChange("password", text)}
            icon={
              <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color={`${invalidFields["password"] ? "red" : "#666"}`}
              />
            }
            isError={invalidFields["password"]}
          />

          <ButtonCustom label="Đăng nhập" onPress={handleSubmit} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              paddingHorizontal: 24,
              paddingVertical: 20,
            }}
          >
            <Text style={{ textDecorationLine: "underline" }}>
              Quên mật khẩu ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              paddingHorizontal: 24,
              paddingVertical: 20,
            }}
          >
            <Text style={{ textDecorationLine: "underline" }}>
              Chưa có tài khoản ?
            </Text>
          </TouchableOpacity>
        </View>
      </SafeView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  imageLogin: {
    display: "flex",
    alignItems: "center",
  },

  contentLogin: {
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

export default Login;
