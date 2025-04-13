// GameResultModal.jsx
export default function GameResult({ message, onClose }) {
    return (
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '30px 50px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#0d1b2a',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{color:'black'}}>{message}</h3>
          <button onClick={onClose} style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#9bda36',
            color: '#0d1b2a',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>Play Again</button>
        </div>
      </div>
    );
  }
  