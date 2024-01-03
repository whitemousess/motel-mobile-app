import {
  Image,
  Modal,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ModalDetail({ isOpen, onClose, data }) {
  if (!data) {
    return null;
  }

  const handlePhoneCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  const handleSendEmail = (email) => {
    const emailUrl = `mailto:${email}`;
    Linking.openURL(emailUrl);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            Thông tin phòng trọ
          </Text>

          <View style={{ marginVertical: 20 }}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: data?.imageUrl[0] }}
                style={{
                  height: 200,
                  width: 200,
                  marginBottom: 10,
                  borderRadius: 999,
                }}
              />
            </View>

            <Text style={{ fontSize: 15, marginVertical: 2 }}>
              <Text style={{ fontWeight: 500 }}>Tiêu đề : </Text>
              {data.title}
            </Text>
            <Text style={{ fontSize: 15, marginVertical: 2 }}>
              <Text style={{ fontWeight: 500 }}>Mô tả : </Text>
              {data.description}
            </Text>
            <Text style={{ fontSize: 15, marginVertical: 2 }}>
              <Text style={{ fontWeight: 500 }}>Loại phòng : </Text>
              {data.type}
            </Text>
            <Text style={{ fontSize: 15, marginVertical: 2 }}>
              <Text style={{ fontWeight: 500 }}>Giá : </Text>
              {data.price} VNĐ
            </Text>
            <Text style={{ fontSize: 15, marginVertical: 2 }}>
              <Text style={{ fontWeight: 500 }}>Địa chỉ : </Text>
              {data.district + " - " + data.province}
            </Text>
            <Text style={{ fontSize: 15, marginVertical: 2 }}>
              <Text style={{ fontWeight: 500 }}>Tình trạng : </Text>
              {data.status == 0 ? " Phòng trống" : " Phòng đã được thuê"}
            </Text>

            {data.userBooked && (
              <View
                style={{ borderTopWidth: 1, paddingTop: 10, marginTop: 10 }}
              >
                <Text style={{ fontSize: 16, fontWeight: 500 }}>
                  Người thuê
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Image
                    source={{ uri: data?.userBooked.imageUrl }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 999,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <Text style={{ fontSize: 16 }}>
                      {data?.userBooked.fullName}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleSendEmail(data?.userBooked.email);
                      }}
                      style={{ marginVertical: 4 }}
                    >
                      <Text style={{ fontSize: 16 }}>
                        {data?.userBooked.email}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handlePhoneCall(data?.userBooked.phone);
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>
                        {data?.userBooked.phone}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={{
              width: "100%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ccc",
              borderWidth: 1,
              borderRadius: 10,
            }}
            onPress={onClose}
          >
            <Text>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModalDetail;
