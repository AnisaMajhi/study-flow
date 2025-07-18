import React, { useRef, useEffect, useState } from 'react';
import { useTool } from '../context/ToolContext';
import { useUndoContext } from '../context/UndoContext';

interface Props {
  registerRestoreState: (fn: (url: string | null) => void) => void;
}

export const Canvas: React.FC<Props> = ({ registerRestoreState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tool, color, size } = useTool();
  const { push, undo, redo } = useUndoContext();
  const [drawing, setDrawing] = useState(false);

  // Setup canvas context
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // initial white background

    // ✅ Save initial blank canvas state
    const dataURL = canvas.toDataURL();
    push(dataURL);
   }, []);


  const saveState = () => {
    const canvas = canvasRef.current!;
    const dataURL = canvas.toDataURL();
    push(dataURL);
  };

  const restoreState = (dataURL: string | null) => {
    if (!dataURL) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  // Register restoreState with parent via prop
  useEffect(() => {
    registerRestoreState(restoreState);
  }, [registerRestoreState]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.strokeStyle = tool === 'pen' ? color : '#ffffff'; // white for eraser
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
    saveState();  // ✅ Save state after finishing stroke
  };


  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setDrawing(false)}
      style={{
        border: '1px solid #ccc',
        backgroundColor: '#ffffff',
        display: 'block',
      }}
    />
  );
};