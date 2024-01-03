import { View } from "react-native";
import MotelItem from "./MotelItem";
import ClientEmpty from "../ClientEmpty";

function motelCard({ data = [], refreshing }) {
  if (data.length == 0) {
    return (
      <ClientEmpty
        title="Không có thông tin trọ"
        description="Không có trọ nào"
      />
    );
  }

  return (
    <View>
      {data.map((motel) => (
        <MotelItem key={motel._id} data={motel} refreshing={refreshing} />
      ))}
    </View>
  );
}

export default motelCard;
