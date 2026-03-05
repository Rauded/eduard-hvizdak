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
    flex: 0 0 80%; /* Take up 65% of the space on larger screens */
  }
`;

// First half: roam forward (scaleY 1), second half: roam back flipped (scaleY -1)
// TARS patrols back and forth on a flat plane.
const patrolAnimation = keyframes`
  /* 1. Start on the far right, facing left */
  0% { transform: translateX(35%) scaleX(-1); }
  5% { transform: translateX(35%) scaleX(-1); } /* Brief pause */

  /* 2. Walk strictly horizontally to the left */
  45% { transform: translateX(-35%) scaleX(-1); }
  50% { transform: translateX(-35%) scaleX(-1); } /* Pause at the left edge */

  /* 3. Pivot instantly to face right */
  50.1% { transform: translateX(-35%) scaleX(1); }
  55% { transform: translateX(-35%) scaleX(1); } /* Brief pause after turning */

  /* 4. Walk back to the right */
  95% { transform: translateX(35%) scaleX(1); }
  100% { transform: translateX(35%) scaleX(-1); } /* Pivot to loop back to 0% */
`;

const TarsContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Ground TARS to the bottom of his container */
  z-index: 1;

  @media (min-width: 768px) {
    width: 65%;
  }
`;

// Styling for the spaceship image with roaming animation (static green theme)
const TarsRender = styled.img`
  width: 100%;
  /* linear easing is CRITICAL. Ease-in-out makes walking animations look like they are sliding */
  animation: ${patrolAnimation} 24s linear infinite; 
  filter: drop-shadow(0 20px 40px rgba(0, 255, 0, 0.25));
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

// Constants for hero component
const topLines = [
  "You're finally awake. Let's explore my work.",
  "Ahoj! Vitaj na mojom portfóliu.",
  "Čau! Rád tě tady vidím.",
  "Welcome to my corner of the web!",
  "Hey! Thanks for dropping by.",
  "Hallo! Schön, dass du da bist.",
  "It's dangerous to go alone! Take this portfolio.",
  "Say hello to my little projects!",
  "Welcome to the dark side of AI.",
  "One RAG pipeline to rule them all.",
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
    // Typewriter effect
    const typeWriter = () => {
      let i = 0;
      let textPos = 0;
      let currentString = typewriterTexts[i];
      const speed = 100; // Typing speed
      const deleteSpeed = 50; // Deleting speed
      const waitTime = 2000; // Time before deleting starts

      // Function to handle typing the text
      function type() {
        setCurrentText(currentString.substring(0, textPos));

        if (textPos++ === currentString.length) {
          setTimeout(() => deleteText(), waitTime); // Wait and start deleting
        } else {
          setTimeout(type, speed); // Continue typing
        }
      }

      // Function to handle deleting the text
      function deleteText() {
        setCurrentText(currentString.substring(0, textPos));

        if (textPos-- === 0) {
          i = (i + 1) % typewriterTexts.length; // Cycle through text array
          currentString = typewriterTexts[i]; // Get next string
          setTimeout(type, speed); // Start typing again
        } else {
          setTimeout(deleteText, deleteSpeed); // Continue deleting
        }
      }

      type(); // Start the typewriter effect
    };

    typeWriter(); // Invoke the typewriter function on component mount
  }, []);

  useEffect(() => {
    // No additional effects needed. 
    // Mirroring and movement strictly handled by the CSS patrolAnimation.
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
            src={`${process.env.PUBLIC_URL}/ascii_matrix.gif`}
            alt="TARS walking ASCII art"
          />
        </TarsContainer>
      </RightContainer>
    </HeroContainer>
  );
};

export default Hero;
