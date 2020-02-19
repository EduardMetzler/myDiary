import React, { useEffect, useCallback, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { OneEntryCard } from "../components/OneEntryCard";

export const OneEntry = () => {
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
    window.scrollTo({ top: 0 });
    getOneText();
  }, [getOneText]);
  if (loading) {
    return <Loader />;
  }

  return <>{!loading && oneEntry && <OneEntryCard oneEntry={oneEntry} />}</>;
};
