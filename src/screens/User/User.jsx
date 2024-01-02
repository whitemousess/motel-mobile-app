import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import * as authService from "~/service/authService";
import { useEffect, useState } from "react";
import DetailProfile from "../DetailProfile";
import SafeView from "~/components/SafeView";

function User() {
  const route = useRoute();
  const userId = route?.params?.userId;
  const [data, setData] = useState({});

  useEffect(() => {
    if (userId) {
      authService
        .getUser({ userId })
        .then((user) => {
          setData(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  return (
      <DetailProfile data={data} />
  );
}

export default User;
