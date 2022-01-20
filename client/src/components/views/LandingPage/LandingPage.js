import React, { useEffect, useState } from "react";
import MainImage from "./Section/MainImage";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import GridCard from "../Commons/GridCard";
import { Row } from "antd";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchMovies = (endpoint) => {
    let mainMoive = [];
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies((prev) => prev.concat(response.results));
        if (pageNumber === 1) {
          setMainMovieImage(response.results[0]);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;
    fetchMovies(endpoint);
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  if (loading) return null;
  console.log("movies", movies);
  return (
    <div style={{ width: "100%", margin: "0" }}>
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${mainMovieImage?.backdrop_path}`}
        title={mainMovieImage}
      />

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        <Row gutter={(16, 16)}>
          {movies?.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCard
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                    : null
                }
                movieId={movie.id}
                movieName={movie.title}
              />
            </React.Fragment>
          ))}
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMore}>Load more</button>
      </div>
    </div>
  );
}

export default LandingPage;
