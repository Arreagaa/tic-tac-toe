import { Square } from "./Square";
import "../assets/css/WinnerModal.css";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Draw" : "Win";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">
          {winner ? (
            <Square>{winner}</Square>
          ) : (
            <p className="winner-modal-text">No one won</p>
          )}
        </header>

        <footer>
          <button onClick={resetGame}>Start over</button>
        </footer>
      </div>
    </section>
  );
}
