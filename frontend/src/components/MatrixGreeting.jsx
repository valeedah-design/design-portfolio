import React, { useState, useEffect } from 'react';
import './MatrixGreeting.css';

const greetings = [
  { text: "Ciao, I'm Valeed", lang: "Italian/English" },
  { text: "مرحبا، أنا فاليد", lang: "Arabic" },
  { text: "नमस्ते, मैं वलीद हूं", lang: "Hindi" },
  { text: "ഹലോ, ഞാൻ വലീദ് ആണ്", lang: "Malayalam" },
  { text: "Hello, I'm Valeed", lang: "English" },
  { text: "Bonjour, je suis Valeed", lang: "French" }
];

const MatrixGreeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(greetings[0].text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      // Glitch effect duration
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % greetings.length);
        setIsGlitching(false);
      }, 500);
      
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(greetings[currentIndex].text);
    }
  }, [currentIndex, isGlitching]);

  return (
    <h2 className={`matrix-greeting ${isGlitching ? 'glitching' : ''}`}>
      {displayText}
    </h2>
  );
};

export default MatrixGreeting;
