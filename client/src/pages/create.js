import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
// import { useMessage } from "../hooks/message.hook";

export const Create = () => {
  // const message = useMessage();

  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const [text, setText] = useState("");
  // useEffect(() => {
  //   message("error");
  //   // clearError();
  // }, [message]);
  const changeHandlerText = event => {
    setText({
      ...text,

      text: event.target.value
    });
  };
  const textHandler = async () => {
    try {
      console.log(text);
      const data = await request(
        "/api/create",
        "POST",
        { text },
        { Authorization: `Bearer ${auth.token}` }
      );
      //   auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    // <textarea rows="111" cols="50" placeholder="Geben Sie Ihre Text"></textarea>
    <div className="input-field col s12">
      <textarea
        id="textarea1"
        className="materialize-textarea"
        name="myText"
        // onChange={e => setText(e.target.value)}
        onChange={changeHandlerText}

        // rows="20"
      ></textarea>
      <label htmfor="textarea1">Ihre Eintrag</label>
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
