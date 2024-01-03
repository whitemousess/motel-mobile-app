import { useEffect, useState } from "react";

import ListItem from "./ListItem";
import * as bookedService from "~/service/bookedService";

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    bookedService
      .historyBooked()
      .then((history) => {
        setData(history.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <ListItem data={data}/>;
}

export default History;
