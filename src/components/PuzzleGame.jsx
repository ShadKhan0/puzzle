import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import PuzzlePiece from './PuzzlePiece';
import Timer from './Timer';

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([
    { id: 1, img: '/levels/level1/1.png', position: null },
    { id: 2, img: '/levels/level1/2.png', position: null },
    { id: 3, img: '/levels/level1/3.png', position: null },
    { id: 4, img: '/levels/level1/4.png', position: null },
  ]);

  const completeImagePath = '/levels/level1/complete-image.jpg';
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [movesMade, setMovesMade] = useState(0);

  const dropTargets = [
    { id: 1, position: { top: '0%', left: '0%' } },
    { id: 2, position: { top: '0%', left: '50%' } },
    { id: 3, position: { top: '50%', left: '0%' } },
    { id: 4, position: { top: '50%', left: '50%' } },
  ];

  const correctPositions = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PIECE',
    drop: (item, monitor) => {
      const pieceIndex = pieces.findIndex((piece) => piece.id === item.id);
      if (pieceIndex !== -1) {
        const dropResult = dropTargets.find((target) => {
          const targetRect = document.getElementById(`target-${target.id}`).getBoundingClientRect();
          const { x, y } = monitor.getClientOffset();
          return x >= targetRect.left && x <= targetRect.right && y >= targetRect.top && y <= targetRect.bottom;
        });
        if (dropResult) {
          const isOccupied = pieces.some((piece) => piece.position === dropResult.id);
          if (!isOccupied) {
            const newPieces = [...pieces];
            newPieces[pieceIndex].position = dropResult.id;
            setPieces(newPieces);
            setMovesMade((prevMovesMade) => prevMovesMade + 1);
            checkCompletion();
          } else {
            console.log('Position is already occupied');
          }
        }
      }
      if (!isTimerActive) setIsTimerActive(true);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const checkCompletion = () => {
    const piecePositions = pieces.map((piece) => piece.position);
    if (piecePositions.every((position, index) => position === correctPositions[index + 1])) {
      setIsCompleted(true);
      setIsTimerActive(false);
      alert(`Level completed! Moves made: ${movesMade}`);
    }
   
  };

  const handlePieceRightClick = (pieceId, event) => {
    event.preventDefault();
    const newPieces = [...pieces];
    const pieceIndex = newPieces.findIndex((piece) => piece.id === pieceId);
    if (pieceIndex !== -1) {
      newPieces[pieceIndex].position = null;
      setPieces(newPieces);
      setMovesMade((prevMovesMade) => prevMovesMade + 1);
    }
  };

  return (
    <div className="puzzle-game" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="left-panel" style={{ flex: 1, marginRight: '20px', marginLeft: '50px', marginTop: '20px' }}>
        <div className="pieces-slider" style={{ display: 'flex', overflowX: 'auto', marginBottom: '20px' }}>
          {pieces.filter((piece) => piece.position === null).map((piece) => (
            <PuzzlePiece key={piece.id} piece={piece} />
          ))}
        </div>
        <div ref={drop} className="puzzle-area" style={{ width: '400px', height: '400px', position: 'relative', marginLeft: '100px', border: '1px solid black', display: ' grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr  1fr' }}>
          {dropTargets.map((target) => (
            <div
              key={target.id}
              id={`target-${target.id}`}
              style={{ position: 'relative', width: '100%', height : '100%', border: '1px dashed gray' }}
            >
              {pieces.map((piece) => piece.position === target.id && (
                <div
                  key={piece.id}
                  onContextMenu={(e) => handlePieceRightClick(piece.id, e)}
                  style={{ width: '200px', height: '200px', position: 'absolute', top: 0, left: 0 }}
                >
                  <PuzzlePiece piece={piece} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel" style={{ flex: 1, marginRight: '50px', marginTop: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'lighter', marginBottom: '20px' }}>
          <strong>Complete Image:</strong>
        </div>
        <img src={completeImagePath} alt="Complete Image" style={{ width: '400px', height: '400px', border: '1px solid black' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '400px', marginBottom: '20px' }}>
          <Timer isCompleted={isCompleted} isActive={isTimerActive} />
          <div style={{ fontSize: '20px', fontWeight: 'lighter' }}>
            <strong>Moves Made: {movesMade}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;