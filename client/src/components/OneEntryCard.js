import React from "react";

export const OneEntryCard = ({ oneEntry }) => {
  //   console.log(oneEntry);
  return (
    <div className="row">
      <div className="col s12 ">
        <div className="card  pink accent-1">
          <div className="card-content black-text">
            <div> {new Date(oneEntry.date).toLocaleDateString()}</div>
            <span className="card-title">Card Title</span>

            <p>{oneEntry.oneText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
