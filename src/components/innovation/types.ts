export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface MetaData {
  [key: string]: string;
}

export interface IdeaNodeType {
  id: string;
  title?: string;
  content: string;
  position: Position;
  size: Size;
  linkedTo: string[];
  metadata: MetaData;
  group?: string;
}

export interface Connection {
  from: string;
  to: string;
}

export interface IdeaGroup {
  id: string;
  name: string;
  color: string;
  nodeIds: string[];
}