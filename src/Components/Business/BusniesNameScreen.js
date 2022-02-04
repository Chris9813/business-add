import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

import { data } from "../../helpers/data";
import { NavBar } from "../ui/NavBar";
import { Table } from "./Table";

export const BusniesNameScreen = ({ history }) => {
  const { businessId } = useParams();

  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const getData = async () => {
    await axios
      .get(
        `https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business/${businessId}/persons`,
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setData(res.data.persons);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getName = async () => {
    await axios
      .get(
        `https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/business/${businessId}`,
        {
          headers: {
            "x-api-key": `l2pm2JpvCY4FR1FwQbGb33Qu1wJhZwDH9BlrkcdZ`,
          },
        }
      )
      .then((res) => {
        setName(res.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
    getName();
  }, []);

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
        <h2>
          <b>{name}</b>
        </h2>
        <Table data={data} />
      </div>
    </div>
  );
};
