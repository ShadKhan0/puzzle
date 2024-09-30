import React, { useState } from "react";
import { useDrop } from "react-dnd";
import PuzzlePiece from "./PuzzlePiece";
import Timer from "./Timer"; // Import the Timer component

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([
    { id: 1, img: "/levels/level1/image_part_001.jpg", position: null },
    { id: 2, img: "/levels/level1/image_part_002.jpg", position: null },
    { id: 3, img: "/levels/level1/image_part_003.jpg", position: null },
    { id: 4, img: "/levels/level1/image_part_004.jpg", position: null },
  ]);

  const completeImagePath = "/levels/level1/complete-image.jpg"; // Path to your complete image
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [movesMade, setMovesMade] = useState(0); // State for counting moves

  // Define drop targets for the grid
  const dropTargets = [
    { id: 1, position: { top: "0%", left: "0%" } },
    { id: 2, position: { top: "0%", left: "50%" } },
    { id: 3, position: { top: "50%", left: "0%" } },
    { id: 4, position: { top: "50%", left: "50%" } },
  ];

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PIECE",
    drop: (item) => {
      const pieceIndex = pieces.findIndex((piece) => piece.id === item.id); // Find the piece being dropped
      if (pieceIndex !== -1) {
        const newPieces = [...pieces];
        // Determine which target was dropped on
        const target = dropTargets.find(
          (target) => target.id === pieceIndex + 1
        ); // Match target with piece index + 1
        if (target) {
          newPieces[pieceIndex].position = target.id; // Set the position based on the drop target
          setPieces(newPieces);
          setMovesMade(movesMade + 1); // Increment the move count
          checkCompletion(); // Check if the puzzle is complete
        }
      }
      if (!isTimerActive) setIsTimerActive(true); // Start the timer on first drop
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const checkCompletion = () => {
    // Logic to check if the puzzle is completed
    if (pieces.every((piece) => piece.position !== null)) {
      setIsCompleted(true);
      setIsTimerActive(false); // Stop the timer when the puzzle is complete
      alert(`Level completed! Moves made: ${movesMade + 1}`); // Show total moves made
    }
  };

  return (
    <div className="puzzle-game">
      {/* Render the complete image */}
      <div className="complete-image">
        <img
          src={completeImagePath}
          alt="Complete Puzzle"
          style={{ width: "300px", height: "300px" }}
        />
      </div>

      {/* Display moves made */}
      <div style={{ marginBottom: "20px" }}>
        <strong>Moves Made: {movesMade}</strong>
      </div>

      {/* Slider for Puzzle Pieces */}
      <div
        className="pieces-slider"
        style={{ display: "flex", overflowX: "auto", marginBottom: "20px" }}
      >
        {pieces.map((piece) => (
          <PuzzlePiece key={piece.id} piece={piece} />
        ))}
      </div>

      {/* Render the drop area for puzzle pieces */}
      <div
        ref={drop}
        className="puzzle-area"
        style={{
          width: "300px",
          height: "300px",
          position: "relative",
          border: "1px solid black",
        }}
      >
        {dropTargets.map((target) => (
          <div
            key={target.id}
            style={{
              position: "absolute",
              ...target.position,
              width: "50%",
              height: "50%",
              border: "1px dashed gray",
            }}
          >
            {pieces.map(
              (piece) =>
                piece.position === target.id && (
                  <PuzzlePiece key={piece.id} piece={piece} />
                )
            )}
          </div>
        ))}
      </div>

      {/* Timer Component */}
      <Timer isActive={isTimerActive} />
    </div>
  );
};

export default PuzzleGame;
