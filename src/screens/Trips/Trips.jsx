import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import ListTrips from "./ListTrips";
import * as bookedService from "~/service/bookedService";

function Trips() {
  const [data, setData] = useState([]);

  const fetch = () => {
    bookedService
      .getMyBooked()
      .then((booked) => {
        setData(booked.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [])
  );

  useEffect(() => {
    fetch();
  }, []);

  const cancel = (id) => {
    bookedService
      .cancelBooked({ id: id })
      .then((booked) => {
        if (booked.status == 200) {
          fetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <ListTrips data={data} onCancel={cancel} />;
}

export default Trips;
