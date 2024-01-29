import React, { useState } from "react";

export default function ButtonContainer() {
  const [activeIndex, setActiveIndex] = useState(null);
  const arr = [0, 1, 2, 3, 4];

  return (
    <div className="button-container">
      {arr.map((btn, i) => {
        return (
          <RatingButton
            onHoverButton={() => setActiveIndex(i)}
            activeIndex={activeIndex}
            key={i}
            index={i}
          />
        );
      })}
    </div>
  );
}

function RatingButton({ index, onHoverButton, activeIndex }) {
  return (
    <button
      onMouseOver={onHoverButton}
      className={`btn-select ${
        activeIndex !== null && index <= activeIndex ? "active" : ""
      }`}
    >
      {index + 1}
    </button>
  );
}
