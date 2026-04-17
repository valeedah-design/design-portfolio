import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.body.classList.add('light-mode');
    } else {
      setIsDark(true);
      document.body.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    
    if (!isDark) {
      // Switch to dark mode
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      // Switch to light mode
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-track">
        <div className={`toggle-thumb ${isDark ? 'dark' : 'light'}`}>
          {isDark ? (
            <Moon size={16} className="icon-moon" />
          ) : (
            <Sun size={16} className="icon-sun" />
          )}
        </div>
      </div>
      <span className="toggle-label">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
};

export default ThemeToggle;
