import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute, useNavigation } from "@react-navigation/native";

import * as paymentService from "~/service/paymentService";

function PaymentModal() {
  const route = useRoute();
  const navigation = useNavigation();
  const [urlVnPay, setUrlVnPay] = useState("");
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [showWebView, setShowWebView] = useState(true);

  useEffect(() => {
    const getStatusBarHeight = () => {
      if (Platform.OS === "android") {
        return StatusBar.currentHeight || 0;
      } else if (Platform.OS === "ios") {
        return 20;
      }
      return 0;
    };
    setStatusBarHeight(getStatusBarHeight());

    paymentService.createUrlVnPay({ data: route?.params }).then((url) => {
      if (url.status == 200) {
        setUrlVnPay(url);
      }
    });
  }, [route?.params]);

  if (showWebView) {
    return (
      <>
        <WebView
          source={{ uri: urlVnPay.data }}
          style={{ marginTop: statusBarHeight }}
          onError={(e) => {
            const errorCode = e.nativeEvent.code;
            if (errorCode == -6) {
              navigation.navigate("ResultPayment", {
                returnUrl: e?.nativeEvent?.url.split("?")[1],
              });
              setShowWebView(false);
            }
          }}
        />
      </>
    );
  }
}

export default PaymentModal;
