export default function GameBoard() {
    const num = 5; // Number of rows/columns for wordle board
  
    return (
      <div className="game-board">
        <h2>GUESS THE WORD</h2>
  
        <div className="board">
          {Array.from({ length: num }).map((_, index) => (
            <div key={index} className="board-row">
              {Array.from({ length: num }).map((_, alpha) => (
                <input type="text" key={alpha} maxLength={1} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  