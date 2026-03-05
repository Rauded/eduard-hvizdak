import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Main container for the hero section
const HeroContainer = styled.section`
  display: flex;
  flex-direction: column; /* Stack items vertically by default */
  min-height: 100vh; /* Full viewport height */
  padding-top: 100px; /* Account for floating header with margin */
  background-color: #09090b;
  color: #fff; /* White text */
  overflow: hidden; /* Prevent overflow */
  font-family: 'RobotoMono', sans-serif; /* Use RobotoMono font */
  position: relative;

  @media (max-width: 768px) {
    padding-top: 90px; /* Account for floating header on mobile */
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at 20% 60%, rgba(99, 102, 241, 0.07) 0%, transparent 55%);
    pointer-events: none;
  }

  @media (min-width: 768px) {
    flex-direction: row; /* On larger screens, layout side by side */
  }
`;

// Left container for text and main title
const LeftContainer = styled.div`
  flex: 1; /* Take up equal space */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center text vertically */
  padding: 40px; /* Padding around the text */
  text-align: left; /* Left-align the text */
  margin-top: -10%; /* Adjust to move text slightly up */
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 24px; /* Reduced padding for smaller screens */
    margin-top: 0; /* Remove negative margin for mobile */
  }

  @media (min-width: 768px) {
    flex: 0 0 35%; /* Take up 35% of the space on larger screens */
    padding: 60px 40px; /* More padding on larger screens */
  }
`;

// Styling for the headline
const Headline = styled.h1`
  font-size: 1.25em;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5em;
  letter-spacing: 0.05em;
  line-height: 1.6;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.5em;
  }
`;

// Right container for the spaceship and animations
const RightContainer = styled.div`
  flex: 1; /* Take up equal space */
  position: relative; /* Needed for absolute positioning of circles */
  display: flex;
  justify-content: center; /* Center the spaceship horizontally */
  align-items: center; /* Center the spaceship vertically */
  overflow: hidden; /* Prevent overflow of elements */
  min-height: 50vh; /* Minimum height for smaller screens */

  @media (min-width: 768px) {
    flex: 0 0 65%; /* Combined with LeftContainer (35%) = 100% */
  }
`;

// First half: roam forward (scaleY 1), second half: roam back flipped (scaleY -1)
// TARS patrols back and forth on a flat plane.
// TARS patrols back and forth starting from the center
const patrolAnimation = keyframes`
  /* 1. Start at center, facing left */
  0% { transform: translateX(0%) scaleX(-1); }
  2.5% { transform: translateX(0%) scaleX(-1); }

  /* 2. Walk to the left edge */
  22.5% { transform: translateX(-15%) scaleX(-1); }
  27.5% { transform: translateX(-15%) scaleX(-1); } /* Pause */

  /* 3. Pivot instantly to face right */
  27.6% { transform: translateX(-15%) scaleX(1); }
  32.5% { transform: translateX(-15%) scaleX(1); }

  /* 4. Walk to the right edge */
  72.5% { transform: translateX(15%) scaleX(1); }
  77.5% { transform: translateX(15%) scaleX(1); } /* Pause */

  /* 5. Pivot instantly to face left */
  77.6% { transform: translateX(15%) scaleX(-1); }
  82.5% { transform: translateX(15%) scaleX(-1); }

  /* 6. Walk back to center */
  97.5% { transform: translateX(0%) scaleX(-1); }
  100% { transform: translateX(0%) scaleX(-1); }
`;

const TarsContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Ground TARS to the bottom of his container */
  z-index: 1;
  position: relative; /* Ensure particles spawn relative to TARS */
  /* Move animation to container so children (TARS + Particles) follow the path */
  animation: ${patrolAnimation} 24s linear infinite; 

  @media (min-width: 768px) {
    width: 80%; /* Increased relative width now that RightContainer is constrained */
  }
`;

// Styling for TARS (animation moved to container)
const TarsRender = styled.img`
  width: 100%;
  filter: drop-shadow(0 20px 40px rgba(0, 255, 0, 0.25));
`;

// Static animation for shrinking and moving circles (uses CSS vars for performance)
const shrinkAndMove = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  100% {
    transform: translate(var(--dest-x), var(--dest-y)) scale(0);
    opacity: 0;
  }
`;

// Circle styling with optimized animation
const Circle = styled.div<{ left: number; top: number; size: number; destX: number; destY: number }>`
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(165, 180, 252, 0.2) 100%);
  border-radius: 50%;
  backdrop-filter: blur(1px);
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  
  /* Use CSS variables to avoid generating unique @keyframes for every particle */
  --dest-x: ${props => props.destX}px;
  --dest-y: ${props => props.destY}px;
  
  animation: ${shrinkAndMove} 2.5s ease-out forwards;
  box-shadow: 0 0 ${props => props.size}px rgba(99, 102, 241, 0.2);
`;

// Styling for the gradient text (title)
const GradientText = styled.h2`
  color: #f8fafc;
  font-size: clamp(2.5em, 8vw, 5em);
  font-weight: 700;
  margin: 0.3em 0;
  letter-spacing: -0.03em;
  line-height: 1.05;

  @media (min-width: 768px) {
    font-size: clamp(3.5em, 6vw, 5.5em);
  }
`;

// Blinking cursor animation
const blink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
`;

// Styling for the typewriter effect text
const TypewriterText = styled.div`
  color: #a5b4fc;
  font-size: clamp(1.1em, 3vw, 1.75em);
  margin-top: 1em;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  letter-spacing: 0.01em;

  &::after {
    content: '_';
    animation: ${blink} 1s infinite;
    color: #6366f1;
    font-weight: 300;
  }
`;

// Interface for circle properties
interface CircleProps {
  id: number;
  left: number;
  top: number;
  size: number;
  destX: number;
  destY: number;
}

// Constants for hero component
const topLines = [
  "Ahoj! Vitaj na mojom portfóliu.",
  "Hey! Thanks for dropping by.",
]; // Array of possible headline texts

const typewriterTexts = [
  "AI Developer @ OneBond",
  "AI Developer @ CZS / Masaryk University",
  "AI Developer @ iGalileo",
  "Think Tank @ EDUC Alliance",
  "CS Student @ Masaryk University",
  "Python & LangChain Developer",
  "Building AI agents & RAG pipelines",
  "Hackathon Fanatic",
  "AI Enthusiast"
]; // Array of texts for the typewriter effect

// Main Hero component
const Hero: React.FC = () => {
  const [circles, setCircles] = useState<CircleProps[]>([]); // State to manage circles
  const [topLine, setTopLine] = useState(''); // State for random headline
  const [currentText, setCurrentText] = useState(''); // State for typewriter text
  const rightContainerRef = useRef<HTMLDivElement>(null); // Ref to get the right container's dimensions

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Pick a random top line for the header when the component mounts
    setTopLine(topLines[Math.floor(Math.random() * topLines.length)]);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Optimized typewriter effect with safety cleanup
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    let i = 0;
    let textPos = 0;
    let currentString = typewriterTexts[i];
    const speed = 100;
    const deleteSpeed = 50;
    const waitTime = 2000;

    function type() {
      if (!isMounted) return;
      setCurrentText(currentString.substring(0, textPos));

      if (textPos++ === currentString.length) {
        timeoutId = setTimeout(() => deleteText(), waitTime);
      } else {
        timeoutId = setTimeout(type, speed);
      }
    }

    function deleteText() {
      if (!isMounted) return;
      setCurrentText(currentString.substring(0, textPos));

      if (textPos-- === 0) {
        i = (i + 1) % typewriterTexts.length;
        currentString = typewriterTexts[i];
        timeoutId = setTimeout(type, speed);
      } else {
        timeoutId = setTimeout(deleteText, deleteSpeed);
      }
    }

    type();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Create new light circles every 500ms
    const interval = setInterval(() => {
      if (rightContainerRef.current) {
        const containerWidth = rightContainerRef.current.clientWidth;
        const containerHeight = rightContainerRef.current.clientHeight;

        const newCircles: CircleProps[] = Array.from({ length: 3 }).map(() => {
          const isVerticalEdge = Math.random() > 0.5;
          const left = isVerticalEdge
            ? (Math.random() > 0.5 ? 0 : containerWidth - 10)
            : Math.random() * containerWidth;

          const top = !isVerticalEdge
            ? (Math.random() > 0.5 ? 0 : containerHeight - 10)
            : Math.random() * containerHeight;

          return {
            id: Date.now() + Math.random(),
            left,
            top,
            size: Math.random() * 8 + 4,
            destX: containerWidth / 2 - left,
            destY: containerHeight / 2 - top,
          };
        });

        setCircles(prevCircles => [...prevCircles, ...newCircles]);

        // Remove the circles after 2.5 seconds
        setTimeout(() => {
          setCircles(prevCircles =>
            prevCircles.filter(circle => !newCircles.some(newCircle => newCircle.id === circle.id))
          );
        }, 2500);
      }
    }, 500); // Slower frequency

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer>
      <LeftContainer>
        <Headline>{topLine}</Headline>
        <GradientText>I'm Eduard Hvižďák.</GradientText>
        <TypewriterText>{currentText}</TypewriterText>
      </LeftContainer>
      <RightContainer ref={rightContainerRef}>
        <TarsContainer>
          <TarsRender
            src={`${process.env.PUBLIC_URL}/ascii_monochrome.gif`}
            alt="TARS walking ASCII art"
          />
          {circles.map(circle => (
            <Circle
              key={circle.id}
              left={circle.left}
              top={circle.top}
              size={circle.size}
              destX={circle.destX}
              destY={circle.destY}
            />
          ))}
        </TarsContainer>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
