import React from "react";

export const NavBar = () => {
  return (
    <div className="align-middle mt-5">
      <ul className="list-group list-group-flush">
        <li
          className="list-group-item "
          style={{ color: "grey", border: "none" }}
        >
          <b>Overview</b>
        </li>
        <li
          className="list-group-item "
          style={{ color: "grey", border: "none" }}
        >
          <b>Tribal Pay</b>
        </li>
        <li
          className="list-group-item "
          style={{ color: "grey", border: "none" }}
        >
          <b>Tribal Credit</b>
        </li>
        <li
          className="list-group-item "
          style={{ color: "grey", border: "none" }}
        >
          <b>Payments</b>
        </li>
        <li
          className="list-group-item "
          style={{ color: "grey", border: "none" }}
        >
          <b>Notifications</b>
        </li>
        <li
          className="list-group-item "
          style={{ color: "grey", border: "none" }}
        >
          <b>Users</b>
        </li>
      </ul>
    </div>
  );
};
