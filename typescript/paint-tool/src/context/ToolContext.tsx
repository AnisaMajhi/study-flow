import React, { createContext, useContext, useState } from 'react';
import { Tool, ToolSettings } from '../types/paint';

type SetSettings = (s: ToolSettings) => void;

const ToolContext = createContext<ToolSettings | undefined>(undefined);
const SetToolContext = createContext<SetSettings | undefined>(undefined);

export const ToolProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [settings, setSettings] = useState<ToolSettings>({
    tool: Tool.Pen,
    color: '#000000',
    size: 5,
  });

  return (
    <ToolContext.Provider value={settings}>
      <SetToolContext.Provider value={setSettings}>
        {children}
      </SetToolContext.Provider>
    </ToolContext.Provider>
  );
};

export function useTool(): ToolSettings {
  const ctx = useContext(ToolContext);
  if (!ctx) throw new Error('useTool must be used within ToolProvider');
  return ctx;
}

export function useSetTool(): SetSettings {
  const ctx = useContext(SetToolContext);
  if (!ctx) throw new Error('useSetTool must be used within ToolProvider');
  return ctx;
}
