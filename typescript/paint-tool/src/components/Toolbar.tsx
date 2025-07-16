import React from 'react';
import { Tool } from '../types/paint';
import { useTool, useSetTool } from '../context/ToolContext';
import { useUndo } from '../hooks/useUndo';

export const Toolbar: React.FC = () => {
  const settings = useTool();
  const setSettings = useSetTool();
  const { undo, redo } = useUndo<string>(); // We'll push DataURL strings

  const handleToolChange = (tool: Tool) => {
    setSettings({ ...settings, tool });
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <button onClick={() => handleToolChange(Tool.Pen)}>
        Pen
      </button>
      <button onClick={() => handleToolChange(Tool.Eraser)} style={{ marginLeft: 4 }}>
        Eraser
      </button>
      {settings.tool === Tool.Pen && (
        <>
          <label style={{ marginLeft: 10 }}>
            Color:
            <input
              type="color"
              value={settings.color}
              onChange={(e) =>
                setSettings({ ...settings, color: e.target.value })
              }
              style={{ marginLeft: 4 }}
            />
          </label>
        </>
      )}
      <label style={{ marginLeft: 10 }}>
        Size:
        <input
          type="range"
          min={1}
          max={50}
          value={settings.size}
          onChange={(e) =>
            setSettings({ ...settings, size: Number(e.target.value) })
          }
          style={{ marginLeft: 4 }}
        />
      </label>
      {/* Undo/Redo */}
      <button onClick={undo as any} style={{ marginLeft: 10 }}>
        Undo
      </button>
      <button onClick={redo as any} style={{ marginLeft: 4 }}>
        Redo
      </button>
    </div>
  );
};
