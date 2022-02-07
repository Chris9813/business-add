import React, { useEffect, useState } from "react";
import axios from "axios";

import { NavBar } from "../ui/NavBar";
import { Table } from "./Table";
import { TableNameScreen } from "./TableNameScreen";
import { useParams } from "react-router-dom";

export const BusniesNameScreen = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get(
        "https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business/e98efaa8-a100-4dbd-a995-ab16655b3f08/persons",
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

  /*
  const names = Object.keys(business[0].people);
  const roles = Object.values(business[0].people).map((item) => item.role);
  const namesRoles = [];
  const empr = () => {
    for (let i = 0; i < names.length; i++) {
      namesRoles.push([names[i], roles[i]]);
    }
  };
  empr();
  console.log(namesRoles);
  */

  return (
    <div className="row">
      <div className="col-sm-2 mx-4">
        <NavBar />
      </div>
      <div className="col-sm-8 mx-4">
        <TableNameScreen />
      </div>
    </div>
  );
};
