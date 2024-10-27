import React, { useState } from 'react';
import { Save, Send, Image, Type, List, Plus } from 'lucide-react';
import EmailBlock from './EmailBlock';

interface EmailEditorProps {
  initialContent?: any;
  onSave: (content: any) => void;
}

export default function EmailEditor({ initialContent, onSave }: EmailEditorProps) {
  const [content, setContent] = useState(initialContent || {
    subject: '',
    blocks: [
      {
        type: 'header',
        data: { text: 'New Email Template', level: 1 }
      }
    ]
  });

  const addBlock = (type: string) => {
    const newBlock = {
      type,
      data: type === 'header' 
        ? { text: 'New Header', level: 2 }
        : type === 'image'
        ? { url: '' }
        : { text: 'New paragraph text' }
    };
    
    setContent({
      ...content,
      blocks: [...content.blocks, newBlock]
    });
  };

  const updateBlock = (index: number, data: any) => {
    const newBlocks = [...content.blocks];
    newBlocks[index] = { ...newBlocks[index], data };
    setContent({ ...content, blocks: newBlocks });
  };

  const deleteBlock = (index: number) => {
    const newBlocks = content.blocks.filter((_, i) => i !== index);
    setContent({ ...content, blocks: newBlocks });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button 
              onClick={() => addBlock('header')}
              className="p-2 hover:bg-gray-100 rounded tooltip"
              title="Add Header"
            >
              <Type className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => addBlock('paragraph')}
              className="p-2 hover:bg-gray-100 rounded tooltip"
              title="Add Paragraph"
            >
              <List className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => addBlock('image')}
              className="p-2 hover:bg-gray-100 rounded tooltip"
              title="Add Image"
            >
              <Image className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onSave(content)}
              className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
            <button className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Send Test
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <input
            type="text"
            value={content.subject}
            onChange={(e) => setContent({ ...content, subject: e.target.value })}
            className="w-full text-xl mb-6 p-2 border-b focus:outline-none focus:border-blue-500"
            placeholder="Email Subject..."
          />
          
          <div className="space-y-6">
            {content.blocks.map((block: any, index: number) => (
              <EmailBlock
                key={index}
                block={block}
                index={index}
                onChange={updateBlock}
                onDelete={deleteBlock}
              />
            ))}
          </div>

          <button
            onClick={() => addBlock('paragraph')}
            className="mt-6 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Content Block
          </button>
        </div>
      </div>
    </div>
  );
}