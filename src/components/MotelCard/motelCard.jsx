import { useEffect, useState } from "react";
import { Text, View } from "react-native";

function motelCard({ data }) {
  return (
    <View>
      {data.map((motel) => (
        <Text key={motel._id}>{motel.title}</Text>
      ))}
    </View>
  );
}

export default motelCard;
