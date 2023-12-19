import { ScrollView } from "react-native";
import MotelItem from "./MotelItem";

function motelCard({ data }) {
  return (
    <ScrollView>
      {data.map((motel) => (
        <MotelItem key={motel._id} data={motel} />
      ))}
    </ScrollView>
  );
}

export default motelCard;
