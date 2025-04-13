import QWERTYKeyboard from "../Components/Keyboard";
import GameBoard from "../Components/GameBoard";
import getWord from '../Components/GetWord';

export default function Game(){
  
    const handleKeyPress = (key) => {
        console.log('Key pressed:', key);
    };

    return(
        <div className="game">
            <GameBoard
                word = {getWord()}
            />
            <QWERTYKeyboard
                onKeyPress={handleKeyPress} 
            />
        </div>
    );
}