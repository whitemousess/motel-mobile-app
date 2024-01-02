import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "~/context/AuthContext";
import AppNav from "~/navigation/AppNav";

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
