import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import SafeView from "~/components/SafeView";
import { AuthContext } from "~/context/AuthContext";

function Menu() {
  const { logOut } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <SafeView>
      <ScrollView
        style={{ height: "100%", marginTop: 10, paddingHorizontal: 10 }}
      >
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={1}
        >
          <Text style={styles.txtMenu}>Trang cá nhân</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.navigate("EditProfile")}
          activeOpacity={1}
        >
          <Text style={styles.txtMenu}>Thông tin cá nhân</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.navigate("PostMotel")}
          activeOpacity={1}
        >
          <Text style={styles.txtMenu}>Đăng phòng trọ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.navigate("MyMotel")}
          activeOpacity={1}
        >
          <Text style={styles.txtMenu}>Phòng trọ đã đăng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.navigate("History")}
          activeOpacity={1}
        >
          <Text style={styles.txtMenu}>Lịch sử thuê</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnMenu}
          onPress={logOut}
          activeOpacity={1}
        >
          <Text style={styles.txtMenu}>Đăng xuất</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  btnMenu: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
  },

  txtMenu: {
    fontSize: 16,
  },
});

export default Menu;
