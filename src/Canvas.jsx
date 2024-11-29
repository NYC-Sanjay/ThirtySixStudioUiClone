import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [currentIndex, setCurrentIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);

  // Handle image animation
  useGSAP(() => {
    // Animate through images
    gsap.to(currentIndex, {
      value: startIndex + numImages - 1,
      duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => setCurrentIndex({ value: Math.round(currentIndex.value) })
    });

    // Fade in canvas
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    });
  });

  // Handle canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio;

    const drawImage = () => {
      const img = new Image();
      img.src = canvasImages[currentIndex.value];
      
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        canvas.style.width = `${canvas.offsetWidth}px`;
        canvas.style.height = `${canvas.offsetHeight}px`;

        // Draw scaled image
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
      };
    };

    drawImage();
  }, [currentIndex]);

  return (
    <canvas
      ref={canvasRef}
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      className="absolute"
      style={{
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex
      }}
    />
  );
}

export default Canvas;