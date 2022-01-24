import Axios from "axios";
import React, { useEffect, useState } from "react";

const Favorite = (props) => {
  const movieId = props?.movieId;
  const userFrom = props?.userFrom;
  const movieTitle = props?.movie?.title;
  const moviePost = props?.movie?.backdrop_path;
  const movieRunTime = props?.movie?.runtime;

  let variable = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const onClickFavorite = () => {
    if (favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variable).then(
        (response) => {
          if (response.data) {
            setFavoriteCount((prev) => prev - 1);
            setFavorited(false);
          } else {
            alert("리스트에서 지우는걸 실패 했습니다.");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavoriteCount((prev) => prev + 1);
          setFavorited(true);
        } else {
          alert("리스트에서 추가하는걸 실패 했습니다.");
        }
      });
    }
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variable).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavoriteCount(response.data.favoriteNumber);
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });

    Axios.post("/api/favorite/favorited", variable).then((response) => {
      console.log("favorited", response.data);
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("숫자 정보를 가져오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div>
      {favorited ? (
        <button onClick={onClickFavorite}>Not favorite {favoriteCount} </button>
      ) : (
        <button onClick={onClickFavorite}>
          Add to favorite {favoriteCount}
        </button>
      )}
    </div>
  );
};

export default Favorite;
