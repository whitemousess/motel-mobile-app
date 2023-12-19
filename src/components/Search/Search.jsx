import { Text, View } from "react-native";

import SelectProvince from "./SelectProvince";

function Search({ iconClear }) {
  return (
    <View style={{ marginTop: 20}}>
      <SelectProvince iconClear={iconClear} />
    </View>
  );
}

export default Search;
