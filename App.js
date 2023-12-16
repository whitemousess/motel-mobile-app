import { useEffect, useState } from "react";
import { Button, ScrollView } from "react-native";
import { Text, View } from "react-native";

import * as motelService from "~/service/motelService";

function App() {
  const [data, setData] = useState([]);

  const loadData = () => {
    motelService
      .getAll()
      .then((motel) => setData(motel))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData;
  }, []);
  console.log(data);
  return (
    <ScrollView>
      <View>
        {data.map((motel) => (
          <Text key={motel.id}>{motel.title}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

export default App;
