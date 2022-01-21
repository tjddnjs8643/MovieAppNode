import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Section/MovieInfo";
import DetailGridCard from "../Commons/DetailGridCard";
const MovieDetail = (props) => {
  let movieId = props.match.params.movieId;
  const [movieDetails, setMovieDetails] = useState();
  const [cast, setCast] = useState();
  const [buttonClick, setButtonClick] = useState(false);
  const [loading, setLoading] = useState(true);

  const showCast = () => {
    setButtonClick((prev) => !prev);
  };
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((response) => setMovieDetails(response));

    fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((response) => setCast(response.cast))
      .then(setLoading(true));
  }, []);

  if (loading == false) return null;
  console.log("saddssad", cast);
  return (
    <div style={{ width: "100%", margin: "0" }}>
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${movieDetails?.backdrop_path}`}
        title={movieDetails}
      />
      <div
        style={{ width: "85%", margin: "1rem auto", justifyContent: "center" }}
      >
        <MovieInfo movie={movieDetails} />
        <hr />

        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          {buttonClick == true && (
            <Row gutter={(16, 16)}>
              {cast?.map((casts, index) => (
                <React.Fragment key={index}>
                  <DetailGridCard
                    image={
                      casts.profile_path
                        ? `${IMAGE_BASE_URL}w500${casts.profile_path}`
                        : null
                    }
                    castName={casts.name}
                    castId={casts.Id}
                  />
                </React.Fragment>
              ))}
            </Row>
          )}
        </div>
        <button onClick={showCast}> Toggle Actor View</button>
      </div>
    </div>
  );
};
export default MovieDetail;
