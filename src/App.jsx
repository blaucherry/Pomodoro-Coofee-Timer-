// src/App.jsx
import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderTab = () => {
    if (activeTab === "home") return <Home />;
    if (activeTab === "stats") return <h2>Estadísticas (próximamente)</h2>;
    if (activeTab === "settings") return <h2>Ajustes (próximamente)</h2>;
    return null;
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Café Pomodoro</h1>
        <p className="app-subtitle">
          Un espacio cozy para concentrarte ☕
        </p>
      </header>

      <main className="app-main">{renderTab()}</main>

      <nav className="app-nav">
        <button
          className={activeTab === "home" ? "nav-btn nav-btn--active" : "nav-btn"}
          onClick={() => setActiveTab("home")}
        >
          Pomodoro
        </button>
        <button
          className={activeTab === "stats" ? "nav-btn nav-btn--active" : "nav-btn"}
          onClick={() => setActiveTab("stats")}
        >
          Estadísticas
        </button>
        <button
          className={activeTab === "settings" ? "nav-btn nav-btn--active" : "nav-btn"}
          onClick={() => setActiveTab("settings")}
        >
          Ajustes
        </button>
      </nav>
    </div>
  );
}

export default App;
