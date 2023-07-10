import React from "react";

const Stars = () => {
  const createStars = () => {
    const stars = [];

    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDelay = Math.random() * 5;

      stars.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${animationDelay}s`,
          }}
        />
      );
    }

    return stars;
  };

  return <div className="stars">{createStars()}</div>;
};

export default Stars;
