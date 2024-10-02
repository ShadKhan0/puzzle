'use client'
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PuzzleGameM from '../../components/PuzzleGameM';


const Medium = () => {
  return (
    
    <DndProvider backend={HTML5Backend}>
      
      <PuzzleGameM />
    </DndProvider>
  );
};

export default Medium;