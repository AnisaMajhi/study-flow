import React, { createContext, useContext } from 'react';
import { useUndo } from '../hooks/useUndo';

const UndoContext = createContext<ReturnType<typeof useUndo<string>> | null>(null);

export const UndoProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const undoState = useUndo<string>();
  return <UndoContext.Provider value={undoState}>{children}</UndoContext.Provider>;
};

export function useUndoContext() {
  const ctx = useContext(UndoContext);
  if (!ctx) throw new Error('useUndoContext must be used within UndoProvider');
  return ctx;
}
