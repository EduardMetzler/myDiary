import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import "./style.css";
import { AuthContext } from "../context/AuthContext";

export const Authentication = () => {
  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [formRegister, setFormRegister] = useState({ email: "", password: "" });
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  const changeHandlerRegister = event => {
    setFormRegister({
      ...formRegister,
      [event.target.name]: event.target.value
    });
    // console.log(formRegister);
  };
  const changeHandlerLogin = event => {
    setFormLogin({
      ...formLogin,
      [event.target.name]: event.target.value
    });
    // console.log(formLogin);
  };
  const registerHandler = async () => {
    // console.log("formLogin");

    try {
      console.log(formRegister);

      const data = await request("/api/auth/register", "POST", {
        ...formRegister
      });
      console.log("Data", data);
      //////

      console.log(formLogin);
      const dataf = await request("/api/auth/login", "POST", {
        ...formRegister
      });
      auth.login(dataf.token, dataf.userId);
      ///////
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      console.log(formLogin);
      const data = await request("/api/auth/login", "POST", { ...formLogin });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };
  return (
    <div>
      <div className="row">
        <div className="col s12 offset-s5 ">
          <h1>Tagebuch</h1>
        </div>
      </div>
      <div className="row">
        <div className="col s10 offset-s1">
          <div className="row">
            <div className="col s6 ">
              <div className="card blue darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Registrirung</span>
                  <div>
                    <div className="input-field ">
                      <input
                        placeholder="email eingeben"
                        type="text"
                        name="email"
                        className="yellow-input"
                        onChange={changeHandlerRegister}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field ">
                      <input
                        placeholder="email password"
                        type="password"
                        name="password"
                        className="yellow-input"
                        onChange={changeHandlerRegister}
                      />
                      <label htmlFor="password">password</label>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <button
                    className="btn yellow darken-4 waves-effect waves-light"
                    style={{ marginRight: 10 }}
                    onClick={registerHandler}
                    disabled={loading}
                  >
                    Fertig
                  </button>
                </div>
              </div>
            </div>
            <div className="col s6">
              <div className="card blue darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Anmeldung</span>
                  <div>
                    <div className="input-field ">
                      <input
                        placeholder="email eingeben"
                        type="text"
                        name="email"
                        className="yellow-input"
                        onChange={changeHandlerLogin}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field ">
                      <input
                        placeholder="email password"
                        type="password"
                        name="password"
                        className="yellow-input"
                        onChange={changeHandlerLogin}
                      />
                      <label htmlFor="password">password</label>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <button
                    className="btn yellow darken-4 waves-effect waves-light"
                    style={{ marginRight: 10 }}
                    onClick={loginHandler}
                    disabled={loading}
                  >
                    enter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
