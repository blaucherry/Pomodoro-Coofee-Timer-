import { useEffect, useState, useRef } from "react";

const MODES = {
  FOCUS: "focus",
  SHORT_BREAK: "short_break",
  LONG_BREAK: "long_break",
};

const DEFAULT_DURATIONS = {
  [MODES.FOCUS]: 25 * 60,
  [MODES.SHORT_BREAK]: 5 * 60,
  [MODES.LONG_BREAK]: 15 * 60,
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Timer() {
  const [mode, setMode] = useState(MODES.FOCUS);
  const [remaining, setRemaining] = useState(DEFAULT_DURATIONS[MODES.FOCUS]);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const intervalRef = useRef(null);

  // 👇 Primero helpers, luego useEffect

  const switchMode = (newMode) => {
    setMode(newMode);
    setRemaining(DEFAULT_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const handleTimerEnd = () => {
    setIsRunning(false);

    if (mode === MODES.FOCUS) {
      const updated = cycleCount + 1;
      setCycleCount(updated);

      if (updated % 4 === 0) {
        switchMode(MODES.LONG_BREAK);
      } else {
        switchMode(MODES.SHORT_BREAK);
      }
    } else {
      switchMode(MODES.FOCUS);
    }
  };

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          handleTimerEnd();   // ✅ ya está definida arriba
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, handleTimerEnd]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemaining(DEFAULT_DURATIONS[mode]);
  };

  const handleSkip = () => {
    if (mode === MODES.FOCUS) {
      handleTimerEnd();
    } else {
      switchMode(MODES.FOCUS);
    }
  };

  const getModeLabel = () => {
    if (mode === MODES.FOCUS) return "Enfoque";
    if (mode === MODES.SHORT_BREAK) return "Descanso corto";
    if (mode === MODES.LONG_BREAK) return "Descanso largo";
    return "";
  };

  return (
    <div className={`timer-card timer-card--${mode}`}>
      <p className="timer-mode-label">{getModeLabel()}</p>

      <div className="timer-time">{formatTime(remaining)}</div>

      <p className="timer-subtitle">
        {mode === MODES.FOCUS
          ? "✨ Es momento de enfocarte"
          : "🌿 Respira, tómate tu cafecito"}
      </p>

      <div className="timer-controls">
        <button className="btn-primary" onClick={handleStartPause}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button className="btn-secondary" onClick={handleReset}>
          Reiniciar
        </button>
        <button className="btn-secondary" onClick={handleSkip}>
          Saltar
        </button>
      </div>

      <div className="timer-cycle">
        Pomodoros en este ciclo: {cycleCount}
      </div>

      <div className="timer-illustration">
        <div className="cup">
          <span className="cup-face">˘‿˘</span>
        </div>
        <p className="timer-illustration-text">
          Te mereces este café mientras estudias ☕
        </p>
      </div>
    </div>
  );
}
