import React from 'react';
import FlowCanvas from './components/FlowCanvas';
import Toolbar from './components/Toolbar';
import ApiKeyModal from './components/ApiKeyModal';
import ImagePreview from './components/ImagePreview';
import WorkflowManager from './components/WorkflowManager';
import ErrorBoundary from './components/ErrorBoundary';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <ErrorBoundary>
      <div className="w-full h-screen flex flex-col">
        <ReactFlowProvider>
          <div className="relative flex-1 w-full">
            <Toolbar />
            <WorkflowManager />
            <FlowCanvas />
            <ApiKeyModal />
            <ImagePreview />
          </div>
        </ReactFlowProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;