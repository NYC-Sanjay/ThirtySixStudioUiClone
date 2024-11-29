import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpanRef = useRef(null);

  // Initialize locomotive scroll
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  // Handle canvas toggle and animations
  useEffect(() => {
    const handleCanvasToggle = (e) => {
      setShowCanvas((prev) => {
        if (!prev) {
          // Show canvas animations
          gsap.set(growingSpanRef.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a", 
            duration: 1.2,
            ease: "power2.inOut"
          });

          gsap.to(growingSpanRef.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpanRef.current, {
                scale: 0,
                clearProps: "all"
              });
            }
          });
        } else {
          // Hide canvas animations
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut"
          });
        }
        return !prev;
      });
    };

    const heading = headingRef.current;
    heading.addEventListener("click", handleCanvasToggle);
    return () => heading.removeEventListener("click", handleCanvasToggle);
  }, []);

  const navLinks = ["What we do", "Who we are", "How we give back", "Talk to us"];

  return (
    <>
      <span
        ref={growingSpanRef}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      />
      
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas && data[0].map((canvasDetails, index) => (
          <Canvas key={index} details={canvasDetails} />
        ))}

        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex gap-10">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          <div className="textcontainer w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are passionate about creating digital experiences that are both beautiful and functional.
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>

          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingRef}
              className="text-[17rem] font-normal tracking-tight leading-none pl-5"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full relative h-screen mt-32 px-10">
        {showCanvas && data[1].map((canvasDetails, index) => (
          <Canvas key={index} details={canvasDetails} />
        ))}
        
        <h1 className="text-8xl tracking-tighter">about the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          we are a team of designers, developers, and strategists who are passionate about creating digital experiences that are both beautiful and functional, we are a team of designers, developers, and strategists who are passionate about creating digital experiences that are both beautiful and functional.
        </p>

        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt="Brand showcase"
        />
      </div>
    </>
  );
}

export default App;