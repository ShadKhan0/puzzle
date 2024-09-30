import React from 'react';
import { useDrag } from 'react-dnd';

const PuzzlePiece = ({ piece }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PIECE',
    item: { id: piece.id }, // Include the piece id when dragging
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: '50px',
        height: '50px',
        backgroundImage:` url(${piece.img})`,
        backgroundSize: 'cover',
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid black',
        marginRight: '10px',
      }}
    />
  );
};

export default PuzzlePiece;