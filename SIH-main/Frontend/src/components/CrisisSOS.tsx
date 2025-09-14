import React from "react";

const CrisisSOS = () => (
  <div style={{
    position: "fixed",
    top: 24,
    right: 24,
    zIndex: 100,
    background: "#fff0f3",
    border: "2px solid #e11d48",
    borderRadius: "1rem",
    padding: "1rem 1.5rem",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
  }}>
    <span role="img" aria-label="SOS" style={{fontSize: "1.5rem", marginRight: 8}}>🚨</span>
    <span style={{fontWeight: 600, color: "#e11d48"}}>Crisis Support:</span>
    <span style={{marginLeft: 8}}>Call <b>988</b> for immediate help</span>
  </div>
);

export default CrisisSOS;