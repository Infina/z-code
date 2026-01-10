import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { getLayoutedElements, RepoMapData } from '../../utils/mapLayout';
import { vscode } from '../../utils/vscode';

interface HolographicMapProps {
  data: RepoMapData | null;
  visible: boolean;
}

const HolographicMap: React.FC<HolographicMapProps> = ({ data, visible }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 当数据更新时，重新计算布局
  useEffect(() => {
    if (data && data.files) {
      if (data.files.length > 0) {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(data);
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      } else {
        setNodes([]);
        setEdges([]);
      }
    }
  }, [data, setNodes, setEdges]);

  // 处理节点点击：实现跳转到文件
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    const fullPath = node.data.fullPath;
    if (fullPath) {
      vscode.postMessage({ type: 'openFile', text: fullPath });
    }
  }, []);

  // 只要有数据就显示，或者 visible 为 true
  if (!data || (!visible && data.files.length === 0)) return null;

  return (
    <div className="holographic-map-container" style={{ width: '100%', height: '300px', minHeight: '300px', border: '1px solid var(--vscode-widget-border)', borderRadius: '6px', margin: '10px 0', overflow: 'hidden', background: 'var(--vscode-sideBar-background)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="var(--vscode-editor-foreground)" gap={16} size={1} />
        <Controls style={{ fill: 'var(--vscode-editor-foreground)' }} />
      </ReactFlow>
    </div>
  );
};

export default HolographicMap;
