import { ScrollView } from "react-native";
import TripItem from "./TripItem";
import ClientEmpty from "~/components/ClientEmpty";

function ListTrips({ data, onCancel }) {
  if (data.length == 0) {
    return (
      <ClientEmpty
        title="Không có phòng trọ nào"
        description="Bạn chưa đặt phòng nào"
      />
    );
  }

  return (
    <ScrollView style={{ height: "100%" }}>
      {data.map((trip) => (
        <TripItem key={trip._id} data={trip} onCancel={onCancel} />
      ))}
    </ScrollView>
  );
}

export default ListTrips;
