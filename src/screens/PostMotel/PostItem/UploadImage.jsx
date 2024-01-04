import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";

import SafeView from "~/components/SafeView";

function UploadImage({ onImageUpload }) {
  const TakePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    const arrayUrl = [];
    if (!result.canceled) {
      result.assets.map((image) => {
        arrayUrl.push(image.uri);
      });
    }

    onImageUpload(arrayUrl);
  };

  return (
    <SafeView>
      <TouchableOpacity
        onPress={TakePicture}
        style={{
          width: "100%",
          height: 150,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: "#DDDDDD",
        }}
      >
        <EvilIcons name="image" size={100} color="black" />
      </TouchableOpacity>
    </SafeView>
  );
}

export default UploadImage;
