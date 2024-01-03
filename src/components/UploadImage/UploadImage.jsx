import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { EvilIcons } from "@expo/vector-icons";

function UploadImage({ onImageUpload }) {
  const [selectImage, setSelectImage] = useState("");

  const TakePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectImage(result.assets[0].uri);
      onImageUpload(result.assets[0].uri);
    }
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <TouchableOpacity
        onPress={TakePicture}
        style={{ width: "100%", flexDirection: "column", alignItems: "center" }}
      >
        {selectImage ? (
          <Image
            source={{ uri: selectImage }}
            style={{
              width: 200,
              height: 200,
              marginBottom: 10,
              borderRadius: 100,
            }}
          />
        ) : (
          <EvilIcons name="image" size={100} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}

export default UploadImage;
