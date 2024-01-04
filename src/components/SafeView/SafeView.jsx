import { StatusBar, View } from "react-native";
import { useEffect, useState } from "react";
function SafeView({ children }) {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

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
  }, []);

  return <View style={{ marginTop: statusBarHeight }}>{children}</View>;
}

export default SafeView;
