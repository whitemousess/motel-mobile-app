import { AuthProvider } from "~/context/AuthContext";
import AppNav from "~/navigation/AppNav";

function App() {
  return (
    <>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </>
  );
}

export default App;
