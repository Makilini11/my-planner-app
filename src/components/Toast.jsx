import React from "react";

// Category-based colors and icons
const categoryConfig = {
  Personal: { color: "#4CAF50", icon: "👤" },
  Office: { color: "#2196F3", icon: "💼" },
  Study: { color: "#FF9800", icon: "📚" },
  Food: { color: "#FF5722", icon: "🥗" },
  Travel: { color: "#9C27B0", icon: "✈️" },
  Health: { color: "#E91E63", icon: "💊" },
  Education: { color: "#3F51B5", icon: "🎓" },
  Others: { color: "#607D8B", icon: "📝" },
  Default: { color: "#333", icon: "ℹ️" },
};

export default function Toast({ message, show, category }) {
  const { color, icon } = categoryConfig[category] || categoryConfig.Default;

  return (
    <div
      style={{
        position: "fixed",
        bottom: show ? 50 : 20,             // Slide up
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: color,
        color: "white",
        padding: "12px 20px",
        borderRadius: 8,
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        opacity: show ? 1 : 0,              // Fade in/out
        transition: "all 0.5s ease",
        pointerEvents: "none",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontWeight: "bold",
        minWidth: "250px",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: "1.2em" }}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}

