import React, { useEffect, useState } from "react";
import MainImage from "./Section/MainImage";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState();
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setMainMovieImage(response.results[0]);
        console.log(response.results[0].backdrop_path);
      });
  }, []);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {mainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button> Load more</button>
      </div>
    </div>
  );
}

export default LandingPage;
