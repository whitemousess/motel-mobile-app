import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import * as authService from "~/service/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const login = (data) => {
    setIsLoading(true);
    authService
      .login({ data })
      .then((res) => {
        if (res?.response?.status == 404) {
          Toast.show({
            type: "error",
            text1: "Tài khoản không tồn tại",
          });
        } else if (res?.response?.status == 401) {
          Toast.show({
            type: "error",
            text1: "Mật khẩu không chính xác",
          });
        } else {
          setToken(res.token);
          setCurrentUser(res);
          AsyncStorage.setItem("token", res.token);
          AsyncStorage.setItem("currentUser", JSON.stringify(res));
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const register = (data) => {
    setIsLoading(true);
    authService
      .register({ data })
      .then((res) => {
        if (res.data) {
          Toast.show({
            type: "success",
            text1: "Đăng ký thành công",
          });
        } else if (res.response.status === 409) {
          Toast.show({
            type: "error",
            text1: "không thể đăng ký",
            text2: "Tài khoản đã tồn tại",
          });
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    setCurrentUser("");
    setToken("");
    AsyncStorage.removeItem("currentUser");
    AsyncStorage.removeItem("token");
  };

  const isLoggedIn = async () => {
    try {
      const UserInfo = await AsyncStorage.getItem("currentUser");
      const Token = await AsyncStorage.getItem("token");

      if (Token) {
        setToken(Token);
        setCurrentUser(JSON.parse(UserInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, currentUser, isLoading, login, register, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
