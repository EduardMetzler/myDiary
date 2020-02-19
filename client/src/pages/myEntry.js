import React, { useContext, useCallback, useState, useEffect } from "react";
import { TextsListe } from "../components/TextsListe";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
export const MyEntry = () => {
  const [texts, setTexts] = useState([]);
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();

  const fetchMyTexts = useCallback(async () => {
    try {
      const fetch = await request("/api/myEntry", "GET", null, {
        Authorization: `Bearer ${token}`
      });
      fetch.reverse();
      setTexts(fetch);
      // console.log(loading);
    } catch (e) {}
  }, [token, request]);
  useEffect(() => {
    window.scrollTo({ top: 0 });

    fetchMyTexts();
  }, [fetchMyTexts]);
  console.log(texts);
  // return <div>fff</div>;
  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <TextsListe texts={texts} />}</>;
};
