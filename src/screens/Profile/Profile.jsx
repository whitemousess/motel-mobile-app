import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DetailProfile from "../DetailProfile";

function Profile() {
  const [data, setData] = useState({});

  const fetch = async () => {
    const currentUser = await AsyncStorage.getItem("currentUser");
    setData(JSON.parse(currentUser));
  };

  useEffect(() => {
    fetch();
  }, []);

  return <DetailProfile data={data} />;
}

export default Profile;
