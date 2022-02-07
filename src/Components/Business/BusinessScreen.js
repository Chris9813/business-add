import React, { useEffect, useState } from "react";
import axios from "axios";

import { NavBar } from "../ui/NavBar";
import { Table } from "./Table";

export const BusinessScreen = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get(
        "https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business",
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setData(res.data.businesses);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 mx-4">
          <NavBar />
        </div>
        <div className="col-sm-8 mx-4">
          <div className="row">
            <div className="col-sm-7 align-items-endd-flex justify-content-start">
              <h2>
                <b>Business Screen</b>
              </h2>
            </div>
          </div>
          <Table item={data} />
        </div>
      </div>
    </div>
  );
};
