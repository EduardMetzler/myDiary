import React from "react";

export const OneEntryCard = ({ oneEntry }) => {
  //   console.log(oneEntry);
  return (
    <div className="row">
      <div className="col s12 ">
        <div className="card  pink accent-1">
          <div className="card-content black-text">
            <div>
              {" "}
              Erstellt am: {new Date(oneEntry.date).toLocaleDateString()}, um:{" "}
              {new Date(oneEntry.date).toLocaleTimeString()}
            </div>
            {/* <span className="card-title">{oneEntry.oneHeading}</span> */}
            <p>Überschrift: {oneEntry.oneHeading}</p>

            <p className="flow-text">Eintrag: {oneEntry.oneText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
