import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as paymentService from "~/service/paymentService";
import SafeView from "~/components/SafeView";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

function ResultPayment() {
  const route = useRoute();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const params = {};

  const urlParams = route?.params?.returnUrl;
  const filterData = urlParams.split("&");
  filterData.forEach((item) => {
    const [key, value] = item.split("=");
    params[key] = value;
  });

  useEffect(() => {
    if (success) {
      paymentService
        .successVnPay({ id: params.vnp_OrderInfo })
        .then((response) => {
          console.log(response); 
        });
    }

    paymentService
      .callbackVnPay({ param: params })
      .then((response) => {
        if (response.data.code == "00") {
          setSuccess(true);
          setMessage("Thanh toán thành công");
        } else if (response.data.code == 24) {
          setError(true);
          setMessage("Thanh toán không thành công");
        }
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setError(true);
          setMessage("Thanh toán Lỗi");
        }
      });
  }, [route?.params]);

  return (
    <SafeView>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {success && (
          <FontAwesome name="check-circle" size={150} color="#6cb85c" />
        )}
        {error && <MaterialIcons name="error" size={150} color="#EF5350" />}
        <Text style={{ marginTop: 20, fontSize: 16, fontWeight: 500 }}>
          {message}
        </Text>
      </View>
    </SafeView>
  );
}

export default ResultPayment;
