import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [timeSince, setTimeSince] = useState('');

  useEffect(() => {
    // Hearts background
    const createHeart = () => {
      const heartEmojis = ['❤️', '💖', '💝', '💕', '💗', '💓', '💘'];
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (Math.random() * 15 + 5) + 's';
      heart.style.opacity = Math.random() * 0.5 + 0.5;
      heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      document.getElementById('hearts')?.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 20000);
    };

    const updateTimeSince = () => {
      const lastMeeting = new Date('2025-01-03T10:48:00+01:00');
      const now = new Date();
      const timeSinceLast = now - lastMeeting;
      
      const daysSince = Math.floor(timeSinceLast / (1000 * 60 * 60 * 24));
      const hoursSince = Math.floor((timeSinceLast % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesSince = Math.floor((timeSinceLast % (1000 * 60 * 60)) / (1000 * 60));
      const secondsSince = Math.floor((timeSinceLast % (1000 * 60)) / 1000);

      setTimeSince(`Od ostatniego spotkania minęło: ${daysSince} dni ${hoursSince} godzin ${minutesSince} minut ${secondsSince} sekund`);
    };

    // Set up intervals
    const heartInterval = setInterval(createHeart, 300);
    const timeSinceInterval = setInterval(updateTimeSince, 1000);

    // Initial calls
    updateTimeSince();

    // Cleanup
    return () => {
      clearInterval(heartInterval);
      clearInterval(timeSinceInterval);
    };
  }, []);

  return (
    <>
      <div className="hearts" id="hearts"></div>

      <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-pink-300/20 animate-pulse">
        <h1 className="text-5xl font-dancing text-pink-300 mb-4">
          Za ile się widzimy? 🥺
        </h1>
        <p className="text-lg font-montserrat text-gray-300 opacity-80">
          {timeSince}
        </p>
      </div>

      <Link 
        to="/krzyzowka" 
        className="fixed top-4 right-4 bg-opacity-10 bg-white backdrop-blur-lg rounded-xl p-4 shadow-xl border border-pink-300/20 hover:scale-105 transition-transform duration-300 text-white"
      >
        Rozwiąż krzyżówkę 🎯
      </Link>
    </>
  );
};

export default Home; 