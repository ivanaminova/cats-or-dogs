import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Result = ({ resultString }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative overflow-hidden">
      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={400}
            recycle={false}
            gravity={0.2}
            initialVelocityY={10}
            colors={[
              "#17eba0", 
              "#f740ff", 
              "#82fff2", 
              "#00c8ff", 
              "#fc6161", 
              "#ffbc44", 
              "#ffeb59", 
            ]}
          />
        </div>
      )}

      <p className="text-3xl font-semibold z-10">IT'S A {resultString.toUpperCase()}!</p>
      <img className="h-60 z-10" src={`${resultString}.png`} alt={resultString} />
    </div>
  );
};

export default Result;
