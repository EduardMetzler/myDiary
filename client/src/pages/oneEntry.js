import React, { useEffect, useCallback, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { OneEntryCard } from "../components/OneEntryCard";

export const OneEntry = () => {
  // const [oneEntry, setOneEntry] = useState(null);
  // const { request, loading } = useHttp();

  // const { token } = useContext(AuthContext);
  // const oneEntryId = useParams().id;
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [oneEntry, setOneEntry] = useState();
  const oneEntryId = useParams().id;

  const getOneText = useCallback(async () => {
    console.log({ oneEntryId });
    try {
      const fetched = await request(`/api/myEntry/${oneEntryId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setOneEntry(fetched);
      console.log("loading");
    } catch (e) {}
  }, [token, oneEntryId, request]);

  useEffect(() => {
    getOneText();
  }, [getOneText]);
  if (loading) {
    return <Loader />;
  }

  return <>{!loading && oneEntry && <OneEntryCard oneEntry={oneEntry} />}</>;
};

// import React, { useContext, useCallback, useState, useEffect } from "react";
// import { TextsListe } from "../components/TextsListe";
// import { useHttp } from "../hooks/http.hook";
// import { AuthContext } from "../context/AuthContext";
// import { Loader } from "../components/Loader";
// export const MyEntry = () => {
//   const [texts, setTexts] = useState([]);
//   const { token } = useContext(AuthContext);
//   const { loading, request } = useHttp();

//   const fetchMyTexts = useCallback(async () => {
//     try {
//       const fetch = await request("api/myEntry", "GET", null, {
//         Authorization: `Bearer ${token}`
//       });
//       setTexts(fetch);
//       console.log(loading);
//     } catch (e) {}
//   }, [token, request]);
//   useEffect(() => {
//     fetchMyTexts();
//   }, [fetchMyTexts]);
//   console.log(texts);
//   // return <div>fff</div>;
//   if (loading) {
//     return <Loader />;
//   }

//   return <>{!loading && <TextsListe texts={texts} />}</>;
// };
