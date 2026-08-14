import React, { useState, useEffect, useRef } from 'react';
import './MatrixGreeting.css';

const greetings = [
  { text: "Ciao, sono Valeed", lang: "Italian" },
  { text: "مرحبا، أنا وليد", lang: "Arabic" },
  { text: "नमस्ते, मैं वलीद हूं", lang: "Hindi" },
  { text: "ഹലോ, ഞാൻ വലീദ് ആണ്", lang: "Malayalam" },
  { text: "Hello, I'm Valeed", lang: "English" }
];

const randomChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

const MatrixGreeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(greetings[0].text);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationFrameRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % greetings.length;

      const currentText = Array.from(greetings[currentIndex].text);
      const targetText = Array.from(greetings[nextIndex].text);

      const maxLength = Math.max(
        currentText.length,
        targetText.length
      );

      setIsAnimating(true);

      let frame = 0;
      const totalFrames = 30;

      const animate = () => {
        if (frame <= totalFrames) {
          let newText = '';

          for (let i = 0; i < maxLength; i++) {
            const progress = frame / totalFrames;

            if (progress < 0.35) {
              // Keep original characters at the beginning
              newText += currentText[i] || '';
            } else if (progress < 0.8) {
              // Matrix scrambling effect
              newText +=
                randomChars[
                  Math.floor(Math.random() * randomChars.length)
                ];
            } else {
              // Reveal the actual target character
              newText += targetText[i] || '';
            }
          }

          setDisplayText(newText);

          frame++;
          animationFrameRef.current =
            requestAnimationFrame(animate);
        } else {
          // Always finish with the exact real text
          setDisplayText(greetings[nextIndex].text);
          setCurrentIndex(nextIndex);
          setIsAnimating(false);
        }
      };

      animationFrameRef.current =
        requestAnimationFrame(animate);
    }, 4000);

    return () => {
      clearInterval(interval);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <h2 className={`matrix-greeting ${isAnimating ? 'animating' : ''}`}>
      {displayText}
    </h2>
  );
};

export default MatrixGreeting;
