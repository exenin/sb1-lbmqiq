import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Settings, Eye, Code, Save } from 'lucide-react';
import { ContentPage, PageComponent } from '../../types/models';
import ComponentPalette from './ComponentPalette';
import ComponentRenderer from './ComponentRenderer';
import PageSettings from './PageSettings';

interface PageBuilderProps {
  page: ContentPage;
  onSave: (page: ContentPage) => void;
}

export default function PageBuilder({ page, onSave }: PageBuilderProps) {
  const [components, setComponents] = useState<PageComponent[]>(page.components);
  const [showSettings, setShowSettings] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  };

  const addComponent = (componentType: string) => {
    const newComponent: PageComponent = {
      id: Date.now().toString(),
      type: componentType,
      data: {},
      settings: {
        position: { x: 0, y: components.length * 100 },
        size: { width: 100, height: 100 },
        style: {}
      }
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (id: string, updates: Partial<PageComponent>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  };

  const handleSave = () => {
    onSave({
      ...page,
      components
    });
  };

  return (
    <div className="h-full flex">
      {/* Component Palette */}
      <div className="w-64 border-r bg-white p-4">
        <ComponentPalette onAdd={addComponent} />
      </div>

      {/* Main Building Area */}
      <div className="flex-1 bg-gray-50">
        <div className="h-16 border-b bg-white px-4 flex items-center justify-between">
          <h2 className="font-medium">{page.title}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="page-builder">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-8"
              >
                {components.map((component, index) => (
                  <Draggable
                    key={component.id}
                    draggableId={component.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-4"
                      >
                        <ComponentRenderer
                          component={component}
                          isPreview={previewMode}
                          onUpdate={(updates) => updateComponent(component.id, updates)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <PageSettings
          page={page}
          onClose={() => setShowSettings(false)}
          onUpdate={(updates) => onSave({ ...page, ...updates })}
        />
      )}
    </div>
  );
}