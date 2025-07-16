import React, { useRef, useEffect, useState } from 'react';
import { useTool } from '../context/ToolContext';
import { useUndo } from '../hooks/useUndo';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tool, color, size } = useTool();
  const [drawing, setDrawing] = useState(false);

  // Undo hook works with DataURL
  const { push, undo, redo } = useUndo<string>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current!;
    push(canvas.toDataURL());
  };

  const restoreState = (url: string | null) => {
    if (!url) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    saveState();
    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.strokeStyle = tool === 'pen' ? color : '#ffffff';
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  // Expose undo/redo to toolbar via global handlers
  useEffect(() => {
    (window as any).undoCanvas = () => restoreState(undo());
    (window as any).redoCanvas = () => restoreState(redo());
  }, [undo, redo]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid #ccc', background: '#fff' }}
    />
  );
};
