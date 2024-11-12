import React from "react";
import Loader from "../Loader/Loader";

const DataLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        // backgroundColor: 'rgba(255, 255, 255, 0)', // Optional: translucent background
        // backgroundColor: 'rgba(255, 255, 255, 0)', // Optional: translucent background
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay

        position: "fixed", // Ensure it's fixed in place
        top: 0,
        left: 0,
        zIndex: 1000, // Ensure it's above other content
      }}
    >
      <Loader
        style={{ color: "#fff", width: "100px", height: "100px" }}
        
        thickness="4px"
      />
    </div>
  );
};

export default DataLoader;
