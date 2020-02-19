import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const Create = () => {
  const history = useHistory(9);
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const [antry, setAntry] = useState({ heading: "", text: "" });
  // const [heading, setHeading] = useState("");

  // const changeHandlerText = event => {
  //   setText({
  //     ...text,

  //     [event.target.name]: event.target.value
  //   });
  // };
  const changeHandlerAntry = event => {
    setAntry({
      ...antry,
      [event.target.name]: event.target.value
    });
  };
  const textHandler = async () => {
    console.log(antry);
    try {
      // console.log(text);
      const data = await request(
        "/api/create",
        "POST",
        { ...antry },
        { Authorization: `Bearer ${auth.token}` }
      );

      console.log(data);
      history.push(`/lobby`);
    } catch (e) {}
  };

  return (
    <div className="input-field col s12">
      <div className="input-field ">
        <input
          // placeholder="Überschrift"
          type="text"
          name="heading"
          className="materialize-textarea"
          onChange={changeHandlerAntry}
        />
        <label htmfor="heading">Überschrift</label>
      </div>
      <div className="input-field">
        <textarea
          id="text"
          className="materialize-textarea"
          name="text"
          onChange={changeHandlerAntry}

          // rows="20"
        ></textarea>
        <label htmfor="textarea1">Ihre Eintrag</label>
      </div>

      <button
        onClick={textHandler}
        className="btn yellow darken-4 waves-effect waves-light"
        style={{ marginRight: 10 }}
        disabled={loading}
      >
        Speichern
      </button>
    </div>
  );
};
