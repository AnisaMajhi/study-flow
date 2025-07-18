import { useState } from 'react';

// Generic undo hook
export function useUndo<T>() {
  const [history, setHistory] = useState<T[]>([]);
  const [index, setIndex] = useState(-1);

  const push = (value: T) => {
    const updated = history.slice(0, index + 1); // remove redo states
    const newHistory = [...updated, value];
    setHistory(newHistory);
    setIndex(updated.length); // set index to the new value
  };


  const undo = (): T | null => {
    if (index <= 0) return null;
    const prevIndex = index - 1;
    setIndex(prevIndex);
    return history[prevIndex];
  };

  const redo = (): T | null => {
    if (index >= history.length - 1) return null;
    const nextIndex = index + 1;
    setIndex(nextIndex);
    return history[nextIndex];
  };

  return { push, undo, redo };
}
