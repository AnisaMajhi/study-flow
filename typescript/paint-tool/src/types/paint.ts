export enum Tool {
  Pen = 'pen',
  Eraser = 'eraser',
}

export interface ToolSettings {
  tool: Tool;
  color: string;
  size: number;
}
