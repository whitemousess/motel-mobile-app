import { Text, View } from "react-native";
import { useState } from "react";

import Item from "./Item";
import SafeView from "~/components/SafeView";
import ClientEmpty from "~/components/ClientEmpty";
import ModalDetail from "./ModalDetail";
import * as bookedService from "~/service/bookedService";

function ListItem({ data = [], onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();

  if (data.length == 0) {
    return (
      <ClientEmpty
        title={"Không có phòng trọ"}
        description={"Bạn chưa đăng phòng trọ nào"}
      />
    );
  }

  const openModal = (dataDetail) => {
    setIsOpen(true);
    setDataDetail(dataDetail);
    bookedService
      .getUserBooked({ motelId: dataDetail._id })
      .then((user) =>
        setDataDetail({ ...dataDetail, userBooked: user.data?.userId })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const onClose = () => {
    setIsOpen(false);
    setDataDetail("");
  };

  return (
    <SafeView>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Quản lý phòng trọ</Text>
        <View style={{ marginTop: 10 }}>
          {data &&
            data.map((motel) => (
              <Item
                data={motel}
                key={motel._id}
                onDelete={onDelete}
                openModal={openModal}
              />
            ))}
        </View>
        <ModalDetail isOpen={isOpen} onClose={onClose} data={dataDetail} />
      </View>
    </SafeView>
  );
}

export default ListItem;
