import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import MotelCard from "~/components/MotelCard";

import SafeView from "~/components/SafeView";
import Search from "~/components/Search";
import * as favoriteServices from "~/service/favoriteService";

function Wishlists() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetch = () => {
    favoriteServices
      .getAllFavorite()
      .then((favorite) => setData(favorite.data))
      .catch((error) => console.log(error));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetch();
    }, 1000);
  }, []);

  useEffect(
    useCallback(() => {
      fetch();
    }, [])
  );

  return (
    <SafeView>
      <Search />

      <Text
        style={{
          marginVertical: 10,
          marginLeft: 24,
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Phòng trọ đã thích
      </Text>

      <ScrollView
        style={{ height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <MotelCard data={data} refreshing={refreshing} />
      </ScrollView>
    </SafeView>
  );
}

export default Wishlists;
