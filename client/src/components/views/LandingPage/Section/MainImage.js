import React from "react";

function MainImage(props) {
  console.log("props", props.image);
  return (
    <div
      style={{
        background: `
        url("${props.image}"), #1c1c1c`,
        minHeight: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <h2> title </h2>
          <p style={{ color: "white", fontSize: "1rem" }}> description </p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
