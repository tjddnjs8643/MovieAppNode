import Axios from "axios";
import React, { useEffect, useState } from "react";
import Favorite from "../../MovieDetail/Section/Favorite";
import "./favorite.css";
const FavoriteInfo = (props) => {
  const userFrom = localStorage.getItem("userId");
  const variable = { userFrom };
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    Axios.post("/api/favorite/favoriteList", variable).then((response) => {
      console.log("response", response);
      if (response.data.success) {
        setFavoriteList(response);
      } else {
        alert("");
      }
    });
  }, []);

  return (
    <>
      <h2>Favorite Movie Info</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie title</th>
            <th>Movie Runtimes</th>
            <th>Remove From Favorite</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
};

export default FavoriteInfo;
