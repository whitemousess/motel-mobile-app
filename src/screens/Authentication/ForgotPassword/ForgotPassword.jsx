import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import SafeView from "~/components/SafeView";
import InputCustom from "~/components/InputCustom";
import ButtonCustom from "~/components/ButtonCustom";
import * as authService from "~/service/authService";

function ForgotPassword() {
  const [data, setData] = useState({
    email: "",
    codeReset: "",
    password: "",
    rePassword: "",
  });
  const [clientForgot, setClientForgot] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});
  const [second, setSecond] = useState(10);

  const fetchForgot = () => {
    authService
      .forgetPassword({ email: data })
      .then((auth) => {
        if (auth.status === 200) {
          setClientForgot(true);
          setSecond(10);
        } else if (auth.response.status === 400) {
          Toast.show({ type: "error", text1: "Chưa có email" });
        } else if (auth.response.status === 404) {
          Toast.show({ type: "error", text1: "Email không tồn tại" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetPassword = () => {
    if (data.password != data.rePassword) {
      Toast.show({ type: "error", text1: "Mật khẩu không trùng khớp" });
    } else {
      authService
        .resetPassword({ data: data })
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              type: "success",
              text1: "Thay đổi mật khẩu thành công",
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (clientForgot) {
      const interval = setInterval(() => {
        setSecond((prevCount) => prevCount - 1);
      }, 1000);
      if (second === 1) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [second, clientForgot]);

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value.trim() });
    setInvalidFields({ ...invalidFields, [key]: false });
  };

  const handleSubmitForget = () => {
    let newInvalidFields = {};

    Object.keys(data).forEach((key) => {
      if (data.email.trim() === "") {
        newInvalidFields["email"] = true;
      } else if (clientForgot && data[key].trim() === "") {
        newInvalidFields[key] = true;
      }
    });

    if (Object.keys(newInvalidFields).length === 0) {
      if (!clientForgot) {
        fetchForgot();
      } else {
        resetPassword();
      }
    } else {
      setInvalidFields(newInvalidFields);
    }
  };

  return (
    <SafeView>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 24,
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        Quên mật khẩu
      </Text>

      <View style={{ paddingHorizontal: 18 }}>
        <InputCustom
          label="Email ..."
          value={data.email}
          keyboardType="email-address"
          onChange={(text) => handleChange("email", text)}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={28}
              color={`${invalidFields["email"] ? "red" : "#666"}`}
            />
          }
          isError={invalidFields["email"]}
        />

        {clientForgot ? (
          <>
            <InputCustom
              label="Mã xác thực ..."
              value={data.codeReset}
              onChange={(text) => handleChange("codeReset", text)}
              icon={
                <Octicons
                  name="number"
                  size={24}
                  color={`${invalidFields["codeReset"] ? "red" : "#666"}`}
                />
              }
              isError={invalidFields["codeReset"]}
            />
            <TouchableOpacity
              onPress={() => {
                second === 1 && handleSubmitForget();
              }}
              style={{
                paddingVertical: 10,
                marginBottom: 10,
                marginRight: 10,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
              activeOpacity={1}
            >
              <Text>
                {second === 1 ? "Gửi lại mã" : `Gửi lại mã sau ${second}`}
              </Text>
            </TouchableOpacity>

            <InputCustom
              label="Mật khẩu ..."
              value={data.password}
              password={true}
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

            <InputCustom
              label="Nhập lại mật khẩu ..."
              value={data.rePassword}
              password={true}
              onChange={(text) => handleChange("rePassword", text)}
              icon={
                <Ionicons
                  name="ios-lock-closed-outline"
                  size={20}
                  color={`${invalidFields["rePassword"] ? "red" : "#666"}`}
                />
              }
              isError={invalidFields["rePassword"]}
            />

            <ButtonCustom
              label="Thay đổi mật khẩu"
              onPress={handleSubmitForget}
            />
          </>
        ) : (
          <ButtonCustom label="Quên mật khẩu" onPress={handleSubmitForget} />
        )}
      </View>
    </SafeView>
  );
}

export default ForgotPassword;
