import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const PersonScreen = () => {
  const { businessId, personId } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get(
        `https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business/${businessId}/persons/${personId}`,
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return <div></div>;
};
