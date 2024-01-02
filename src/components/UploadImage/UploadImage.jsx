import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

function UploadImage({onImageUpload}) {
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
      onImageUpload(result.assets[0].uri)
    }
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      {selectImage ? (
        <View>
          <Image
            source={{ uri: selectImage }}
            style={{
              width: 200,
              height: 200,
              marginBottom: 10,
              borderRadius: 100,
            }}
          />
        </View>
      ) : null}
      <TouchableOpacity
        onPress={TakePicture}
        style={{
          height: 50,
          width: "60%",
          backgroundColor: "skyblue",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>Take a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UploadImage;
