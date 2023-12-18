import { SafeAreaView } from "react-native-safe-area-context";

function SafeView({ children }) {
  return <SafeAreaView>{children}</SafeAreaView>;
}

export default SafeView;
