import React, { useEffect, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import { invoke } from '@tauri-apps/api/core';

const HologramBackground = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}
  >
    <h1 style={{ color: 'rgba(255,255,255,0.10)', fontSize: '9rem', margin: 0 }}>Z-CORE</h1>
  </div>
);

export default function App() {
  const initialText = useMemo(
    () =>
      [
        '// Welcome to Project Z (Genesis Block)',
        '// System: ONLINE',
        '',
        'fn main() {',
        '    println!("Hello from 4090!");',
        '}',
        '',
      ].join('\n'),
    [],
  );

  const [text, setText] = useState(initialText);

  useEffect(() => {
    const handleKey = async (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        try {
          const savedPath = await invoke<string>('save_file', { content: text });
          // eslint-disable-next-line no-console
          console.log('Saved to:', savedPath);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Save failed:', err);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [text]);

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <HologramBackground />

      {/* Custom title bar (drag region) */}
      <div
        data-tauri-drag-region
        style={{
          height: 30,
          background: 'rgba(0,0,0,0.55)',
          zIndex: 100,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
          color: 'rgba(255,255,255,0.90)',
          fontSize: 12,
          userSelect: 'none',
        }}
      >
        Project Z :: Operational Report 007
      </div>

      <div style={{ position: 'relative', zIndex: 10, height: 'calc(100% - 30px)', display: 'flex' }}>
        {/* File tree placeholder */}
        <div
          style={{
            width: 220,
            background: 'rgba(0,0,0,0.30)',
            borderRight: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          <div style={{ padding: 10, color: 'rgba(255,255,255,0.65)' }}>src</div>
          <div style={{ padding: '8px 20px', color: '#4caf50' }}>main.rs</div>
        </div>

        {/* Monaco layer */}
        <div style={{ flex: 1 }}>
          <Editor
            height="100%"
            defaultLanguage="rust"
            theme="vs-dark"
            value={text}
            onChange={(value) => setText(value ?? '')}
            options={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              contextmenu: true,
              padding: { top: 14, bottom: 14 },
            }}
          />
        </div>
      </div>
    </div>
  );
}
