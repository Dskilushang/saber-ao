import React, { useState, useEffect } from "react";
import questions, { Question } from "./questions";

const App: React.FC = () => {
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Cette fonction mélange les questions pour que chaque partie soit unique
  const initGame = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setGameQuestions(shuffled.slice(0, 7)); // On sélectionne 7 questions au hasard
    setCurrent(0);
    setSelectedIndex(null);
    setScore(0);
    setCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  if (gameQuestions.length === 0) return null;

  const q = gameQuestions[current];

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return; 
    setSelectedIndex(index);
    const selected = q.options[index];
    if (selected === q.correct) setScore((s) => s + 1000); // Système de points style "Millions"
  };

  const handleNext = () => {
    const next = current + 1;
    if (next >= gameQuestions.length) {
      setCompleted(true);
      return;
    }
    setCurrent(next);
    setSelectedIndex(null);
  };

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="logo">SABER AO • ARENA</div>
        <div className="score">SCORE : {score} PTS</div>
      </header>

      <main className="container">
        {!completed ? (
          <section className="card">
            <div className="meta">NIVEAU {current + 1} / {gameQuestions.length}</div>
            <h2 className="question">{q.question}</h2>

            <div className="options-grid">
              {q.options.map((opt, i) => {
                const isSelected = selectedIndex === i;
                const isCorrect = selectedIndex !== null && opt === q.correct;
                const isWrong = isSelected && opt !== q.correct;

                let className = "option";
                if (isSelected) className += " selected";
                if (isCorrect) className += " correct";
                if (isWrong) className += " wrong";

                return (
                  <button
                    key={i}
                    className={className}
                    onClick={() => handleSelect(i)}
                    disabled={selectedIndex !== null}
                  >
                    <span className="opt-index">{String.fromCharCode(65 + i)}</span>
                    <span className="opt-text">{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="controls">
              {selectedIndex !== null && (
                <button className="next-btn" onClick={handleNext}>
                  QUESTION SUIVANTE ➔
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="end-screen card">
            <h2>FIN DE L'ARÈNE</h2>
            <p className="final-score">Score Final : {score} PTS</p>
            <button className="restart" onClick={initGame}>
              REJOUER
            </button>
          </section>
        )}
      </main>

      <style>{`
        :root {
          --bg: #071226;
          --card: #0b1220;
          --accent: #ffd700;
          --muted: #94a3b8;
        }
        body {
          margin: 0;
          background: var(--bg);
          color: #fff;
          font-family: sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .app-root { width: 100%; max-width: 600px; padding: 20px; }
        .topbar { display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: bold; color: var(--accent); }
        .card { background: #0e172a; padding: 30px; borderRadius: 15px; border: 1px solid #1e293b; text-align: center; }
        .question { font-size: 22px; margin-bottom: 25px; }
        .options-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
        .option { display: flex; padding: 15px; background: #1e293b; color: #fff; border: 1px solid #334155; border-radius: 10px; cursor: pointer; text-align: left; font-size: 16px; }
        .opt-index { color: var(--accent); font-weight: bold; margin-right: 15px; }
        .option.correct { background: #10b981; border-color: #10b981; }
        .option.wrong { background: #ef4444; border-color: #ef4444; }
        .next-btn, .restart { background: var(--accent); color: #000; border: none; padding: 12px 25px; font-weight: bold; border-radius: 8px; cursor: pointer; margin-top: 20px; }
      `}</style>
    </div>
  );
};

export default App;
                 
