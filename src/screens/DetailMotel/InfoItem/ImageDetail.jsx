import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

function ImageDetail({ image }) {
  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    if (image) {
      setCurrentImage(image[0]);
    }
  }, [image]);

  return (
    <View>
      {image && (
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Image
            source={{ uri: currentImage }}
            style={{ width: "100%", height: 400, borderRadius: 10 }}
          />
        </View>
      )}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {image &&
          image.map((data) => (
            <TouchableOpacity
              key={data}
              style={{ marginRight: 10 }}
              activeOpacity={0.9}
              onPress={() => setCurrentImage(data)}
            >
              <Image
                source={{ uri: data }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}

export default ImageDetail;
