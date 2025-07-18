import React from 'react';
import { Tool } from '../types/paint';
import { useTool, useSetTool } from '../context/ToolContext';
import { useUndoContext } from '../context/UndoContext';

// Optional: if restoreState is passed through another context or prop
interface Props {
  restoreState: (dataURL: string | null) => void;
}

export const Toolbar: React.FC<Props> = ({ restoreState }) => {
  const settings = useTool();
  const setSettings = useSetTool();
  const { undo, redo } = useUndoContext();

  const handleToolChange = (tool: Tool) => {
    setSettings({ ...settings, tool });
  };

  return (
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <button onClick={() => handleToolChange(Tool.Pen)}>
        Pen
      </button>
      <button onClick={() => handleToolChange(Tool.Eraser)}>
        Eraser
      </button>

      {settings.tool === Tool.Pen && (
        <label>
          Color:
          <input
            type="color"
            value={settings.color}
            onChange={(e) => setSettings({ ...settings, color: e.target.value })}
            style={{ marginLeft: 4 }}
          />
        </label>
      )}

      <label>
        Size:
        <input
          type="range"
          min={1}
          max={50}
          value={settings.size}
          onChange={(e) => setSettings({ ...settings, size: Number(e.target.value) })}
          style={{ marginLeft: 4 }}
        />
      </label>

      <button onClick={() => restoreState(undo())}>
        Undo
      </button>
      <button onClick={() => restoreState(redo())}>
        Redo
      </button>
    </div>
  );
};