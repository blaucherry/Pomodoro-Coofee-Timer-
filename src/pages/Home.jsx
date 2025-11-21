// src/pages/Home.jsx
import Timer from "../components/Timer";

export default function Home() {
  return (
    <section className="home-layout">
      <div className="home-left">
        <Timer />
      </div>

      <aside className="home-right">
        <h2 className="home-title">Tu enfoque de hoy</h2>
        <p className="home-text">
          Aquí pronto verás un resumen de tus pomodoros, metas y pequeñas notas
          de tu día de estudio u oficina.
        </p>

        <div className="home-card">
          <p className="home-card-label">Mood de hoy</p>
          <p className="home-card-main">☕ Modo concentración suave</p>
          <p className="home-card-sub">
            Ponte cómoda, respira profundo y arranca con el primer bloque.
          </p>
        </div>

        <div className="home-mini-grid">
          <div className="home-mini">
            <span className="home-mini-label">Pomodoros objetivo</span>
            <span className="home-mini-value">4</span>
          </div>
          <div className="home-mini">
            <span className="home-mini-label">Descansos planeados</span>
            <span className="home-mini-value">3</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
