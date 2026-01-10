import dagre from 'dagre';
import { Node, Edge, Position } from 'reactflow';

// 定义 Rust 后端返回的数据结构接口
export interface RepoMapData {
  files: {
    path: string;
    score: number; // PageRank 权重
    definitions: string[];
  }[];
  edges: {
    source: string;
    target: string;
    weight: number;
  }[];
}

const nodeWidth = 180;
const nodeHeight = 50;

export const getLayoutedElements = (data: RepoMapData, direction = 'LR') => {
  if (!data || !data.files) return { nodes: [], edges: [] };
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  // 1. 转换并添加节点
  data.files.forEach((file) => {
    dagreGraph.setNode(file.path, { width: nodeWidth, height: nodeHeight });
  });

  // 2. 转换并添加连线
  data.edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // 3. 计算布局
  dagre.layout(dagreGraph);

  // 4. 生成 React Flow Nodes
  const nodes: Node[] = data.files.map((file) => {
    const nodeWithPosition = dagreGraph.node(file.path);
    
    // 根据 PageRank 分数计算颜色深度或大小 (Visual Encoding)
    const opacity = Math.max(0.4, Math.min(1, file.score * 5)); 
    
    return {
      id: file.path,
      type: 'default', // 后续可以自定义 Custom Node
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
      data: { 
        label: file.path.split('/').pop(), // 只显示文件名
        fullPath: file.path,
        score: file.score
      },
      style: {
        background: `rgba(var(--vscode-button-background), ${opacity})`,
        color: 'var(--vscode-button-foreground)',
        border: '1px solid var(--vscode-widget-border)',
        width: nodeWidth,
        fontSize: '12px',
      },
    };
  });

  // 5. 生成 React Flow Edges
  const edges: Edge[] = data.edges.map((edge) => ({
    id: `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    animated: true, // 让数据流看起来是活的
    style: { 
      stroke: 'var(--vscode-editor-foreground)',
      opacity: 0.5,
      strokeWidth: Math.max(1, edge.weight) // 权重越大线条越粗
    },
  }));

  return { nodes, edges };
};
