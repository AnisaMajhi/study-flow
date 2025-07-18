import React, { useRef } from 'react';
import { ToolProvider } from './context/ToolContext';
import { UndoProvider } from './context/UndoContext';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';

export const App: React.FC = () => {
  // Ref to hold restoreState
  const restoreStateRef = useRef<(url: string | null) => void>(() => {});

  return (
    <ToolProvider>
      <UndoProvider>
        <Toolbar restoreState={(url) => restoreStateRef.current(url)} />
        <Canvas registerRestoreState={(fn) => (restoreStateRef.current = fn)} />
      </UndoProvider>
    </ToolProvider>
  );
};
