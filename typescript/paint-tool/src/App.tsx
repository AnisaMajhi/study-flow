import React from 'react';
import { ToolProvider } from './context/ToolContext';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';

export const App: React.FC = () => (
  <ToolProvider>
    <Toolbar />
    <Canvas />
  </ToolProvider>
);
