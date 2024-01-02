import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

import * as favoriteService from "~/service/favoriteService";
import { useEffect, useState } from "react";

function MotelItem({ data, refreshing }) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchFavorite = () => {
    favoriteService
      .getAllFavorite()
      .then((res) => {
        const favorite = res.data.filter(
          (favorite) => favorite._id === data._id
        );
        if (favorite.length > 0) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
      fetchFavorite();
  }, [refreshing]);

  const addFavorite = (id) => {
    if (!isFavorite) {
      setIsFavorite(true);
      favoriteService
        .addFavorite({ motelId: id })
        .catch((err) => console.log(err));
    } else {
      setIsFavorite(false);
      favoriteService
        .deleteFavorite({ id: id })
        .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", { motelId: data._id });
      }}
      activeOpacity={1}
      style={{
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "#DDDDDD",
          borderRadius: 16,
        }}
      >
        <View
          style={{
            padding: 16,
          }}
        >
          <Image
            source={{ uri: data.imageUrl[0] }}
            style={{ width: 295, height: 295, borderRadius: 10 }}
          />
          <TouchableOpacity
            onPress={() => addFavorite(data._id)}
            style={{ position: "absolute", right: 30, top: 30 }}
            activeOpacity={1}
          >
            <FontAwesome
              name={`${isFavorite ? "heart" : "heart-o"}`}
              size={24}
              color={`${isFavorite ? "#D83752" : "white"}`}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "70%",
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 16,
          }}
        >
          <Text style={{ fontSize: 14 }}>{data.title}</Text>
          <Text style={{ color: "#717171", marginTop: 10 }}>
            {data.province + " - " + data.district}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 49,
            backgroundColor: "rgba(0,0,0,.02)",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            padding: 10,
          }}
        >
          <Text>{data.price} VNĐ</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 24,
              borderWidth: 1,
              height: 36,
              borderColor: "#DDDDDD",
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            activeOpacity={1}
          >
            <Text>Xem thông tin</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MotelItem;
