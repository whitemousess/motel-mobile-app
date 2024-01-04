import { useCallback, useEffect, useState } from "react";

import ListItem from "./ListItem";
import * as bookedService from "~/service/bookedService";

function History() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetch();
    }, 1000);
  }, []);

  const fetch = () => {
    bookedService
      .historyBooked()
      .then((history) => {
        setData(history.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch();
  }, []);

  return <ListItem data={data} refreshing={refreshing} onRefresh={onRefresh} />;
}

export default History;
