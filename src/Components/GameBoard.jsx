import { useEffect, useState } from "react";
import wordList from '../data/wordlist.json'
import GameResultModal from '../Layouts/GameResult'; 



export default function GameBoard({word}) {
  const num = 5; // Number of rows/columns for wordle board
  const [rownum,setRowNum] = useState(0);
  const [current, setCurrent] = useState('');
  const [gameStatus, setGameStatus] = useState('');


  let dict = {};
  const letters = word ? word.split('') : [];

  for(let i=0;i<5;i++){
    dict[letters[i]]=(dict[letters[i]]||0)+1;
  }


  function isWordPresent(rownum){

    let newWord = '';
    for(let i=0;i<5;i++){
      newWord += document.getElementById(`${rownum}/${i}`).value;
    }

    return wordList.includes(newWord.toUpperCase());
  }


  function checkWord() {

    if(!isWordPresent(rownum)){
      alert('Word not present');
      return;
    }

    let flag = true;

    for (let i = 0; i < 5; i++) {
      let elem = document.getElementById(`${rownum}/${i}`);
      let keyElem = document.getElementById(elem.value);
      elem.disabled = true;
    
      if (letters[i] === elem.value) {
        elem.style.backgroundColor = "green"; // Green
        if (keyElem && getComputedStyle(keyElem).backgroundColor !== "rgb(155, 218, 54)") {
          keyElem.style.backgroundColor = "#9bda36"; // Green
        }
      } else {
        let value = dict[elem.value] || 0;
        flag = false;
    
        if (value > 0) {
          dict[elem.value] = value - 1;
          elem.style.backgroundColor = "#CC7722"; // Yellow
          if (keyElem && getComputedStyle(keyElem).backgroundColor !== "rgb(155, 218, 54)") {
            keyElem.style.backgroundColor = "#CC7722"; // Yellow
          }
        } else {
          elem.style.backgroundColor = "grey"; // Grey
          if (
            keyElem &&
            getComputedStyle(keyElem).backgroundColor !== "rgb(155, 218, 54)" &&
            getComputedStyle(keyElem).backgroundColor !== "rgb(204, 119, 34)"
          ) {
            keyElem.style.backgroundColor = "grey"; // Only set if not already green or yellow
          }
        }
      }
    }
    

    if(flag){
      setGameStatus('You won!');
    }

    else{
      if(rownum==4){
        setGameStatus(`Oops! You lost! The word was "${word}".`);
      }else{
        setRowNum(rownum+1);
      }
    }

  }

  function nextCell(row, cell) {
    if (cell < 4) {
      const nextId = `${row}/${cell + 1}`;
      setCurrent(nextId);
      const nextElem = document.getElementById(nextId);
      if (nextElem) {
        nextElem.disabled = false;
        nextElem.focus();
      }
    }
  }

  

  const cellInput = (e) => {
    const id = e.target.id;
    const [row, cell] = id.split('/').map(Number);

    if (e.key === 'Backspace') {
      if (e.target.value.length === 0 && cell > 0) {
        const prevId = `${row}/${cell - 1}`;
        document.getElementById(id).disabled = true;
        setCurrent(prevId);
        const prevElem = document.getElementById(prevId);
        if (prevElem) {
          prevElem.disabled = false;
          prevElem.focus();
        }
      }
    } else if (e.key === 'Enter') {
      if (cell === 4 && e.target.value.length === 1) {
        checkWord();
      }
    } else if (e.key === 'ArrowLeft') {
      if (cell > 0) {
        const leftId = `${row}/${cell - 1}`;
        setCurrent(leftId);
        const leftElem = document.getElementById(leftId);
        if (leftElem) {
          leftElem.focus();
        }
      }
    } else if (e.key === 'ArrowRight') {
      if (cell < 4) {
        const rightId = `${row}/${cell + 1}`;
        setCurrent(rightId);
        const rightElem = document.getElementById(rightId);
        if (rightElem) {
          rightElem.focus();
        }
      }
    } else if (/^[A-Za-z]$/i.test(e.key)) {
      // Prevent default to handle alphabets our own way
      e.preventDefault();
      
      // Set the value directly
      e.target.value = e.key.toUpperCase();
      
      // Move to next cell after setting the value
      nextCell(row, cell);
    }
  };

  const handleChange = (e) => {
    // This is a fallback validation that shouldn't be needed with our keydown handler
    const value = e.target.value;
    if (value && !/^[A-Za-z]$/i.test(value)) {
      e.target.value = '';
    } else if (value) {
      e.target.value = value.toUpperCase();
    }
  };
  
  useEffect(() => {
    const start = document.getElementById(`${rownum}/0`);
    if (start) {
      start.disabled = false;
      start.focus();
      setCurrent(start.id);
    }
  }, [rownum]);

  return (
    <div className="game-board">
      <h2>GUESS THE WORD</h2>
      {/* {word} */}
      <div className="board">
        {Array.from({ length: num }).map((_, index) => (
          <div key={index} className="board-row">
            {Array.from({ length: num }).map((_, alpha) => (
              <input
                type="text"
                key={alpha}
                maxLength={1}
                id={`${index}/${alpha}`}
                onKeyDown={(e) => cellInput(e)}
                onChange={handleChange}
                disabled
              />
            ))}
          </div>
        ))}
      </div>

      {gameStatus && (
        <GameResultModal
          message={gameStatus}
          onClose={() => window.location.reload()} // or reset game logic manually
        />
      )}
    </div>
  );
}