import wordList from '../data/wordlist.json'

function getWord(){

    const WORD_LIST_LENGTH = wordList.length;
    const randomIndex = Math.floor(Math.random() * WORD_LIST_LENGTH);
    return(wordList[randomIndex]);
}

export default getWord;