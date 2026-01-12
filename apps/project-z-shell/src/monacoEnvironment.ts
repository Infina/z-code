// Vite + Monaco: wire up web workers so Monaco works in Tauri/WebView.
// This avoids the common "Could not create web worker" failure.
//
// NOTE: With Vite 6, using `new URL('monaco-editor/...', import.meta.url)` can fail to resolve
// bare specifiers during build. Importing the workers via `?worker` is reliable.

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).MonacoEnvironment = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getWorker(_moduleId: any, label: string) {
    switch (label) {
      case 'json':
        return new JsonWorker();
      case 'css':
      case 'scss':
      case 'less':
        return new CssWorker();
      case 'html':
      case 'handlebars':
      case 'razor':
        return new HtmlWorker();
      case 'typescript':
      case 'javascript':
        return new TsWorker();
      default:
        return new EditorWorker();
    }
  },
};
