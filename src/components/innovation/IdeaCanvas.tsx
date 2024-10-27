import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Excalidraw, exportToCanvas } from '@excalidraw/excalidraw';
import { nanoid } from 'nanoid';
import { Plus, Save, ZoomIn, ZoomOut } from 'lucide-react';
import Card from '../common/Card';
import { isDemoMode } from '../../utils/env';

interface CanvasState {
  elements: any[];
  appState: any;
}

const defaultAppState = {
  zoom: { value: 1 },
  viewBackgroundColor: '#ffffff'
};

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export default function IdeaCanvas() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    elements: [],
    appState: defaultAppState
  });
  const autoSaveTimerRef = useRef<NodeJS.Timeout>();
  const isInitialMount = useRef(true);

  // Load saved state on mount
  useEffect(() => {
    const loadSavedState = () => {
      if (isDemoMode) {
        try {
          const saved = localStorage.getItem('ideaCanvas');
          if (saved) {
            const parsedState = JSON.parse(saved);
            setCanvasState(parsedState);
          }
        } catch (error) {
          console.error('Failed to load saved canvas:', error);
        }
      }
    };

    loadSavedState();
  }, []);

  // Auto-save setup
  useEffect(() => {
    if (!isInitialMount.current && excalidrawAPI) {
      autoSaveTimerRef.current = setInterval(() => {
        handleSave();
      }, AUTOSAVE_INTERVAL);

      return () => {
        if (autoSaveTimerRef.current) {
          clearInterval(autoSaveTimerRef.current);
        }
      };
    }
    isInitialMount.current = false;
  }, [excalidrawAPI]);

  const handleSave = useCallback(() => {
    if (!excalidrawAPI) return;

    const elements = excalidrawAPI.getSceneElements();
    const appState = excalidrawAPI.getAppState();
    const stateToSave = { elements, appState };

    if (isDemoMode) {
      localStorage.setItem('ideaCanvas', JSON.stringify(stateToSave));
    } else {
      // TODO: Implement API save
      console.log('Saving to API:', stateToSave);
    }
  }, [excalidrawAPI]);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    if (!excalidrawAPI) return;

    const currentZoom = excalidrawAPI.getAppState().zoom.value;
    const newZoom = direction === 'in' ? currentZoom * 1.2 : currentZoom / 1.2;

    excalidrawAPI.updateScene({
      appState: {
        zoom: { value: newZoom }
      }
    });
  }, [excalidrawAPI]);

  const handleExport = useCallback(async () => {
    if (!excalidrawAPI) return;

    try {
      const canvas = await exportToCanvas({
        elements: excalidrawAPI.getSceneElements(),
        appState: excalidrawAPI.getAppState(),
        files: excalidrawAPI.getFiles(),
      });

      const link = document.createElement('a');
      link.download = `idea-canvas-${new Date().toISOString()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to export canvas:', error);
    }
  }, [excalidrawAPI]);

  const handleChange = useCallback((elements: any[], appState: any) => {
    // Only update state if there are actual changes
    if (JSON.stringify(elements) !== JSON.stringify(canvasState.elements) ||
        JSON.stringify(appState) !== JSON.stringify(canvasState.appState)) {
      setCanvasState({ elements, appState });
    }
  }, [canvasState]);

  return (
    <Card 
      title="Idea Canvas" 
      icon={Plus}
      action={{ label: 'Export', onClick: handleExport }}
    >
      <div className="relative h-[calc(100vh-200px)] bg-white rounded-lg overflow-hidden">
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button
            onClick={() => handleZoom('in')}
            className="p-2 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <ZoomIn className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-2 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <ZoomOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="absolute top-4 left-4 z-10 p-2 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          <Save className="h-5 w-5 text-gray-600" />
        </button>

        <div className="w-full h-full">
          <Excalidraw
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            initialData={{
              elements: canvasState.elements,
              appState: canvasState.appState,
              scrollToContent: true,
            }}
            onChange={handleChange}
            UIOptions={{
              canvasActions: {
                toggleTheme: false,
                export: false,
                saveToActiveFile: false,
                loadScene: false,
                clearCanvas: true,
                changeViewBackgroundColor: false,
              }
            }}
          />
        </div>
      </div>
    </Card>
  );
}