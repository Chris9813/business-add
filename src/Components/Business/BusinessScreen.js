import React, { useEffect, useState } from "react";
import axios from "axios";

import { NavBar } from "../ui/NavBar";
import { Table } from "./Table";

export const BusinessScreen = () => {
  return (
    <div className="">
      <div className="d-flex">
        <div className="d-flex justify-content-lg-start">
          <NavBar />
        </div>
        <div className="col-sm-8 mx-4">
          <div className="row">
            <div className="col-sm-7 align-items-endd-flex justify-content-start"></div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};
