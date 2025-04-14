import { useState } from 'react';
import keyboardData from '../files/QWERTY.json';

const QWERTYKeyboard = ({ onKeyPress }) => {
  const QWERTY_KEYS = keyboardData.data.QWERTY_KEYS;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);

  const hideKeyboard = () => setIsKeyboardVisible(false);
  const showKeyboard = () => setIsKeyboardVisible(true);

    const newWord = () =>{
        window.location.reload();
    }

  return (
    <div className='keys'>
        <div className='toggle-button'>
        {!isKeyboardVisible && (
            <button
            onClick={showKeyboard}
          >
            Show Keyboard
          </button>
        )}

        {isKeyboardVisible && (
            <button
            onClick={hideKeyboard}
          >
            Hide Keyboard
          </button>
        )}

        <button
            onClick={newWord}
        >New Word</button>
        </div>

      <div className='keyboard'>
        {isKeyboardVisible && (
            <div className="qwerty-keyboard">
            {QWERTY_KEYS.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                {row.map((key) => (
                    // <button key={key} onClick={() => onKeyPress(key)} id={`${key}`}>
                    <button key={key} id={`${key}`}>
                    {key}
                    </button>
                ))}
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default QWERTYKeyboard;
