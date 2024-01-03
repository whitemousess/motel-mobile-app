import { ScrollView, Text, View } from "react-native";
import TripItem from "./TripItem";
import ClientEmpty from "~/components/ClientEmpty";
import SafeView from "~/components/SafeView";

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
    <SafeView>
      <View style={{paddingHorizontal: 10,paddingTop: 10}}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Phòng đã thuê</Text>
        <ScrollView style={{ height: "100%" }}>
          {data.map((trip) => (
            <TripItem key={trip._id} data={trip} onCancel={onCancel} />
          ))}
        </ScrollView>
      </View>
    </SafeView>
  );
}

export default ListTrips;
