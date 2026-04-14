function Legend() {
  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      background: "white",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      zIndex: 1000
    }}>
      <h4>Magnitude</h4>

      <div>🟢 &lt; 3</div>
      <div>🟡 3 - 5</div>
      <div>🟠 5 - 7</div>
      <div>🔴 7+</div>
    </div>
  );
}

export default Legend;