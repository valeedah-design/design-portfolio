import React, { useState, useEffect } from 'react';
import './MatrixGreeting.css';

const greetings = [
  { text: "Ciao, I'm Valeed", lang: "Italian/English" },
  { text: "مرحبا، أنا ڤاليد", lang: "Arabic" }, // Using ڤ for 'v' sound
  { text: "नमस्ते, मैं वलीद हूं", lang: "Hindi" },
  { text: "ഹലോ, ഞാൻ വലീദ് ആണ്", lang: "Malayalam" },
  { text: "Hello, I'm Valeed", lang: "English" },
  { text: "Bonjour, je suis Valeed", lang: "French" }
];

const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

const MatrixGreeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(greetings[0].text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      animateToNextText();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const animateToNextText = () => {
    const nextIndex = (currentIndex + 1) % greetings.length;
    const targetText = greetings[nextIndex].text;
    const currentText = displayText;
    const maxLength = Math.max(targetText.length, currentText.length);
    
    setIsAnimating(true);
    let frame = 0;
    const totalFrames = 20;

    const animate = () => {
      if (frame < totalFrames) {
        let newText = '';
        
        for (let i = 0; i < maxLength; i++) {
          const progress = (frame - i) / totalFrames;
          
          if (progress < 0) {
            // Haven't started flipping this character yet
            newText += currentText[i] || '';
          } else if (progress < 0.5) {
            // Flipping - show random character
            newText += randomChars[Math.floor(Math.random() * randomChars.length)];
          } else if (progress < 1) {
            // Still flipping - more random
            newText += randomChars[Math.floor(Math.random() * randomChars.length)];
          } else {
            // Settled on final character
            newText += targetText[i] || '';
          }
        }
        
        setDisplayText(newText);
        frame++;
        requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <h2 className={`matrix-greeting ${isAnimating ? 'animating' : ''}`}>
      {displayText.split('').map((char, index) => (
        <span 
          key={index} 
          className="char"
          style={{
            animationDelay: `${index * 0.05}s`
          }}
        >
          {char}
        </span>
      ))}
    </h2>
  );
};

export default MatrixGreeting;
