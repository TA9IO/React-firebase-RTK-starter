import React from "react";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <span className="loader">T9</span>
    </div>
  );
}

export default Loader;
