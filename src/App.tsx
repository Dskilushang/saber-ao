import React, { useState, useEffect } from "react";
import questions, { Question } from "./questions";

const App: React.FC = () => {
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const initGame = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setGameQuestions(shuffled.slice(0, 7));
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
    if (selected === q.correct) {
      setScore((s) => s + 1000);
    }
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
        <div className="logo">🛡️ ARENA SABER AO</div>
        <div className="score">CAGNOTTE : {score} PTS</div>
      </header>

      <main className="container">
        {!completed ? (
          <section className="card">
            <div className="meta">PALIER {current + 1} / {gameQuestions.length}</div>
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
                  VALIDER ET CONTINUER ➔
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="end-screen card">
            <h2 style={{ fontSize: "2rem", color: "#ffd700" }}>🏆 VICTOIRE 🏆</h2>
            <p className="final-score">Vous repartez avec : {score} PTS</p>
            <button className="restart" onClick={initGame}>
              TENTER UN NOUVEAU COMBAT
            </button>
          </section>
        )}
      </main>

      <style>{`
        :root {
          --bg: #040814;
          --card: #0b132b;
          --accent: #ffd700;
          --border: #1c2541;
        }
        body {
          margin: 0;
          background-color: var(--bg);
          color: #fff;
          font-family: sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .app-root { width: 100%; max-width: 650px; padding: 15px; }
        .topbar { display: flex; justify-content: space-between; margin-bottom: 25px; padding: 10px; border-bottom: 2px solid var(--border); font-weight: bold; font-size: 1.1rem; color: var(--accent); }
        .card { background: var(--card); padding: 35px; border-radius: 20px; border: 2px solid var(--border); text-align: center; }
        .meta { color: var(--accent); font-weight: bold; letter-spacing: 2px; margin-bottom: 15px; font-size: 0.9rem; }
        .question { font-size: 1.4rem; line-height: 1.4; margin-bottom: 30px; font-weight: 600; }
        .options-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
        .option { display: flex; align-items: center; padding: 18px; background: #1c2541; color: #fff; border: 1px solid #3a506b; border-radius: 99px; cursor: pointer; text-align: left; font-size: 1.05rem; transition: all 0.2s ease; }
        .opt-index { color: var(--accent); font-weight: bold; margin-right: 15px; border: 1px solid var(--accent); padding: 2px 8px; border-radius: 50%; }
        .option.correct { background: #06d6a0; border-color: #06d6a0; font-weight: bold; }
        .option.wrong { background: #ef476f; border-color: #ef476f; }
        .next-btn, .restart { background: linear-gradient(135deg, #ffd700, #ffa500); color: #000; border: none; padding: 14px 30px; font-weight: 800; border-radius: 99px; cursor: pointer; margin-top: 25px; font-size: 1rem; }
      `}</style>
    </div>
  );
};

export default App;
      
