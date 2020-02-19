import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "materialize-css";
// import Authentication from "./pages/authentication";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import { Footer } from "./components/Footer";

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated }}
    >
      <Router>
        <div id="all">
          {/* <div id="page"> */}
          {isAuthenticated && <Navbar />}
          <div className="container con" style={{ marginTop: "100px" }}>
            {routes}
          </div>
          {/* </div> */}
          {isAuthenticated && <Footer />}
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
