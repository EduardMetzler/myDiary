import React from "react";
import { Link } from "react-router-dom";
export const TextsListe = ({ texts }) => {
  console.log(texts);
  if (!texts.length) {
    return <p className="center">Du hast noch nichts gescpeichert</p>;
  }
  return (
    <>
      {texts.map((text, index) => {
        return (
          <Link key={text._id} to={`/oneEntry/${text._id}`}>
            <div className="row">
              <div className="col s12 ">
                <div className="card  blue lighten-5">
                  <div className="card-content black-text">
                    <div> {new Date(text.date).toLocaleDateString()}</div>
                    <span className="card-title">Card Title</span>

                    <p>{text.oneText}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          // <Link key={text._id} to={`/oneEntry/${text._id}`}>
          //   <div key={text._id} style={{ padding: "20px", background: "grey" }}>
          //     {text.oneText}
          //     <div> {new Date(text.date).toLocaleDateString()}</div>
          //   </div>
          // </Link>
        );
      })}
    </>
    // <div></div>
  );
};
