import React, { useState } from "react";
import questions from "./questions";

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = questions[current];

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return; // already answered
    setSelectedIndex(index);
    const selected = q.options[index];
    if (selected === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    const next = current + 1;
    if (next >= questions.length) {
      setCompleted(true);
      return;
    }
    setCurrent(next);
    setSelectedIndex(null);
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelectedIndex(null);
    setScore(0);
    setCompleted(false);
  };

  const perfect = score === questions.length && completed;

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="logo">SABER AO</div>
        <div className="score">Score: {score} / {questions.length}</div>
      </header>

      <main className="container">
        {!completed ? (
          <section className="card">
            <div className="meta">Question {current + 1} • {questions.length}</div>
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
                    aria-pressed={isSelected}
                  >
                    <span className="opt-index">{String.fromCharCode(65 + i)}</span>
                    <span className="opt-text">{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="controls">
              {selectedIndex !== null ? (
                <button className="next-btn" onClick={handleNext}>
                  Suivant
                </button>
              ) : (
                <div className="hint">Choisissez une réponse pour continuer</div>
              )}
            </div>
          </section>
        ) : (
          <section className="end-screen card">
            <h2>Quiz terminé</h2>
            <p className="final-score">Votre score : {score} / {questions.length}</p>
            <p className="message">
              {perfect
                ? "Tu es un vrai fils du pays ! 🎉"
                : score >= Math.ceil(questions.length * 0.7)
                ? "Bravo — tu connais bien l'Angola !"
                : "Pas mal — continue d'apprendre plus sur ton pays !"}
            </p>

            <div className="end-actions">
              <button className="restart" onClick={handleRestart}>
                Rejouer
              </button>
            </div>
          </section>
        )}
      </main>

      <style>{`
        :root{
          --bg:#0f1724;
          --card:#0b1220;
          --muted:#94a3b8;
          --accent:#6ee7b7;
          --danger:#fb7185;
          --glass: rgba(255,255,255,0.03);
        }
        *{box-sizing:border-box}
        html,body,#root{height:100%;}
        body{margin:0;font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;color:#e6eef8;background:linear-gradient(180deg,#071226 0%, #071b2a 100%);display:flex;align-items:center;justify-content:center;padding:24px}
        .app-root{width:100%;max-width:780px}
        .topbar{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-radius:12px;background:linear-gradient(90deg, rgba(255,255,255,0.02), transparent);backdrop-filter: blur(6px);margin-bottom:18px}
        .logo{font-weight:800;letter-spacing:1px;font-size:20px;color:var(--accent)}
        .score{font-size:14px;color:var(--muted)}
        .container{min-height:420px}
        .card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));padding:28px;border-radius:14px;box-shadow: 0 8px 30px rgba(2,6,23,0.6)}
        .meta{color:var(--muted);font-size:13px;margin-bottom:8px}
        .question{margin:6px 0 18px;font-size:20px;line-height:1.3}
        .options-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
        .option{display:flex;align-items:center;gap:12px;padding:14px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:var(--glass);color:#e6eef8;cursor:pointer;transition:transform .12s ease, box-shadow .12s ease, background .12s ease}
        .option:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(2,6,23,0.6)}
        .option:active{transform:translateY(-2px)}
        .option[disabled]{opacity:0.95;cursor:default}
        .opt-index{display:inline-flex;width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.03);align-items:center;justify-content:center;font-weight:700;color:var(--muted)}
        .opt-text{flex:1;text-align:left}
        .option.correct{border-color: rgba(110,231,183,0.25);background:linear-gradient(90deg, rgba(110,231,183,0.06), rgba(110,231,183,0.03))}
        .option.wrong{border-color: rgba(251,113,133,0.18);background:linear-gradient(90deg, rgba(251,113,133,0.03), transparent)}
        .option.selected{outline:2px solid rgba(99,102,241,0.06)}

        .controls{display:flex;align-items:center;justify-content:flex-end;margin-top:18px}
        .hint{color:var(--muted);font-size:13px}
        .next-btn{background:linear-gradient(90deg,#60a5fa,#7c3aed);color:white;border:none;padding:10px 16px;border-radius:10px;cursor:pointer;font-weight:600;box-shadow:0 6px 18px rgba(124,58,237,0.18)}
        .next-btn:hover{transform:translateY(-2px)}

        .end-screen{display:flex;flex-direction:column;align-items:center;text-align:center}
        .final-score{font-size:20px;font-weight:700;margin:6px 0}
        .message{color:var(--muted);margin-bottom:18px}
        .restart{background:transparent;border:1px solid rgba(255,255,255,0.06);padding:10px 14px;border-radius:10px;color:var(--accent);cursor:pointer}

        @media (max-width:520px){
          .options-grid{grid-template-columns:1fr}
          .app-root{padding:8px}
        }
      `}</style>
    </div>
  );
};

export default App;
