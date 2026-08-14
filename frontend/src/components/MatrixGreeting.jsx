import React, { useEffect, useState } from 'react';
import './MatrixGreeting.css';

const greetings = [
  { text: 'Ciao, sono Valeed', lang: 'Italian' },
  { text: 'مرحبا، أنا وليد', lang: 'Arabic' },
  { text: 'नमस्ते, मैं वलीद हूं', lang: 'Hindi' },
  { text: 'ഹലോ, ഞാൻ വലീദ് ആണ്', lang: 'Malayalam' },
  { text: "Hello, I'm Valeed", lang: 'English' }
];

const MatrixGreeting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % greetings.length
        );
        setVisible(true);
      }, 300);
    }, 3500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <h2
      className={`matrix-greeting ${visible ? 'visible' : 'hidden'}`}
      lang={greetings[currentIndex].lang}
    >
      {greetings[currentIndex].text}
    </h2>
  );
};

export default MatrixGreeting;
