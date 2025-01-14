import React, { useCallback } from 'react';
import CrosswordPuzzle from '@jaredreisinger/react-crossword';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';

const data = {
  across: {
    1: {
      clue: "Miejsce naszego pierwszego spotkania",
      answer: "DWORZEC",
      row: 0,
      col: 0,
    },
    3: {
      clue: "Twój ulubiony kwiat ode mnie",
      answer: "ROZA",
      row: 2,
      col: 3,
    },
    5: {
      clue: "Nasza ulubiona piosenka (Until I ...)",
      answer: "FOUNDYOU",
      row: 4,
      col: 0,
    }
  },
  down: {
    2: {
      clue: "Miasto, w którym się zakochaliśmy",
      answer: "SZCZECIN",
      row: 0,
      col: 6,
    },
    4: {
      clue: "Kolor twoich oczu",
      answer: "PIWNE",
      row: 1,
      col: 2,
    },
    6: {
      clue: "Nasza ulubiona pora roku",
      answer: "ZIMA",
      row: 3,
      col: 4,
    }
  }
};

const CrosswordPage = () => {
  const navigate = useNavigate();

  const onCrosswordComplete = useCallback((completeCount) => {
    if (completeCount === Object.keys(data.across).length + Object.keys(data.down).length) {
      anime({
        targets: '.crossword-container',
        scale: [1, 1.1],
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
          navigate('/');
        }
      });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
      <div className="crossword-container bg-opacity-10 bg-white backdrop-blur-lg rounded-xl p-6 shadow-xl border border-pink-300/20 max-w-2xl w-full">
        <h1 className="text-3xl font-dancing text-pink-300 text-center mb-6">
          Nasza Krzyżówka 💝
        </h1>
        <div className="crossword-wrapper" style={{ background: 'transparent' }}>
          <CrosswordPuzzle 
            data={data}
            onCrosswordComplete={onCrosswordComplete}
            theme={{
              gridBackground: 'transparent',
              cellBackground: '#2c1338',
              cellBorder: '#ff9ecd',
              textColor: '#ffffff',
              numberColor: '#ff9ecd',
              focusBackground: '#4a1942',
              highlightBackground: '#3a1535',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrosswordPage; 