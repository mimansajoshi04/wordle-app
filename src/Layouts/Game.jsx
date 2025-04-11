import QWERTYKeyboard from "../Components/Keyboard";
import GameBoard from "../Components/GameBoard";
import { useEffect, useState } from "react";
import wordList from '../data/wordlist.json'

export default function Game(){

    const [word,setWord] = useState('');
    const WORD_LIST_LENGTH = wordList.length;

    useEffect(()=>{
        const randomIndex = Math.floor(Math.random() * WORD_LIST_LENGTH);
        setWord(wordList[randomIndex])
    },[]);

    const handleKeyPress = (key) => {
        console.log('Key pressed:', key);
    };

    return(
        <div className="game">
            {word}
            <GameBoard/>
            <QWERTYKeyboard
                onKeyPress={handleKeyPress} 
            />
        </div>
    );
}