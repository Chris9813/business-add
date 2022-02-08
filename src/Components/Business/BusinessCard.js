import React from "react";

export const BusinessCard = ({ item }) => {
  return (
    <div className="row row-cols-2 row-cols-md-2 g-4 mb-3">
      <div className="col">
        <div className="card">
          <div key={item.id} className="card-body">
            <h5 key={item.name && item.name} className="card-title">
              {item.name}
            </h5>
            <h6
              key={item.role && item.role}
              className="card-subtitle mb-2 text-muted"
            >
              {item.role && item.role}
            </h6>
            <hr />
            <p key={item.email && item.email} className="card-text">
              {item.email && item.email}
            </p>
            <p key={item.phone && item.phone} className="card-text">
              {item.phone && item.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
