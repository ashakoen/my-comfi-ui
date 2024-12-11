import React, { useState } from 'react';
import { Save, FolderOpen, Trash2, X } from 'lucide-react';
import { useWorkflowStore } from '../store/workflowStore';

const WorkflowManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDesc, setNewWorkflowDesc] = useState('');
  
  const { 
    addWorkflow, 
    deleteWorkflow, 
    loadWorkflow,
    getWorkflowMetadata 
  } = useWorkflowStore();

  const workflows = getWorkflowMetadata();

  const handleSave = () => {
    if (!newWorkflowName.trim()) return;
    addWorkflow(newWorkflowName.trim(), newWorkflowDesc.trim());
    setNewWorkflowName('');
    setNewWorkflowDesc('');
  };

  const handleLoad = (id: string) => {
    loadWorkflow(id);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-16 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 z-50"
        title="Manage Workflows"
      >
        <FolderOpen className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Workflow Manager</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Save Current Workflow</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newWorkflowName}
                  onChange={(e) => setNewWorkflowName(e.target.value)}
                  placeholder="Workflow name"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={newWorkflowDesc}
                  onChange={(e) => setNewWorkflowDesc(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full p-2 border rounded h-20"
                />
                <button
                  onClick={handleSave}
                  disabled={!newWorkflowName.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Workflow
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Saved Workflows</h3>
              <div className="space-y-2">
                {workflows.length === 0 ? (
                  <p className="text-gray-500 italic">No saved workflows</p>
                ) : (
                  workflows.map(workflow => (
                    <div
                      key={workflow.id}
                      className="border rounded p-3 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{workflow.name}</h4>
                          {workflow.description && (
                            <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            {workflow.nodeCount} nodes • Last updated {new Date(workflow.updated).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleLoad(workflow.id)}
                            className="p-1 hover:bg-blue-100 rounded text-blue-600"
                            title="Load Workflow"
                          >
                            <FolderOpen className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteWorkflow(workflow.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                            title="Delete Workflow"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkflowManager;