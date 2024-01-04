import { RefreshControl, ScrollView, Text, View } from "react-native";
import Item from "./Item";
import ClientEmpty from "~/components/ClientEmpty";
import SafeView from "~/components/SafeView";

function ListItem({ data = [], onRefresh, refreshing }) {
  if (data.length == 0) {
    return (
        <ClientEmpty
          title="Không có lịch sử thuê phòng"
          description="Bạn chưa thuê phòng nào"
        />
    );
  }

  return (
    <SafeView>
      <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>Trọ đã thuê</Text>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data.map((item) => (
            <Item data={item} key={item._id} />
          ))}
        </ScrollView>
      </View>
    </SafeView>
  );
}

export default ListItem;
