import React, { useEffect, useState } from "react";
import axios from "axios";

import { NavBar } from "../ui/NavBar";
import { Table } from "./Table";
import { TableNameScreen } from "./TableNameScreen";
import { useParams } from "react-router-dom";

export const BusniesNameScreen = () => {
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
