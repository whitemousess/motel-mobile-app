import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageDetail from "./ImageDetail";
import * as favoriteService from "~/service/favoriteService";
import * as bookedService from "~/service/bookedService";

function InfoItem({ data }) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);

  if (data) {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

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
    if (!isLoading) {
      fetchFavorite();
    }
  }, [isLoading]);

  useEffect(() => {
    if (data.status == 0) {
      setIsBooked(false);
    } else {
      setIsBooked(true);
    }
  }, [data]);
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

  const booked = (id) => {
    if (!isBooked) {
      setIsBooked(true);
      bookedService.bookedMotel({ id }).catch((err) => console.log(err));
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={50} color="#333" />
      </View>
    );
  }

  return (
    <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
      <ImageDetail image={data.imageUrl} />

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 20,
        }}
        activeOpacity={1}
        onPress={() =>
          navigation.navigate("User", {
            userId: data?.userId._id,
          })
        }
      >
        <Text style={{ marginRight: 10 }}>{data.userId?.fullName}</Text>
        <Image
          source={{ uri: data.userId?.imageUrl }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop: 24,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>{data.title}</Text>
          <Text
            style={{
              fontSize: 14,
              paddingVertical: 6,
              fontWeight: 500,
              color: "#333",
            }}
          >
            {data.type}
          </Text>
          <Text>{data.district + " - " + data.province}</Text>
        </View>

        <TouchableOpacity
          onPress={() => addFavorite(data._id)}
          activeOpacity={1}
        >
          <FontAwesome
            name={`${isFavorite ? "heart" : "heart-o"}`}
            size={24}
            color={`${isFavorite ? "#D83752" : "black"}`}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 500, color: "#333" }}>
          {data.price} VNĐ
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#16a34a",
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: `${isBooked ? "#16a34a" : "white"}`,
        }}
        activeOpacity={1}
        onPress={() => booked(data._id)}
      >
        <Text
          style={{
            color: `${isBooked ? "#fff" : "#000"}`,
          }}
        >
          {isBooked ? "Phòng đã được thuê" : "Thuê phòng"}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}
      >
        <Text>{data.description}</Text>
      </View>
    </ScrollView>
  );
}

export default InfoItem;
