import React, { useState } from 'react';
import { Paintbrush, Layout, Grid, Image, Save, Eye, X } from 'lucide-react';
import { useIndustryProfile } from '../../hooks/useIndustryProfile';
import { IndustryType } from '../../types/industry';
import ColorPicker from './ColorPicker';
import LayoutEditor from './LayoutEditor';
import GridEditor from './GridEditor';
import AssetManager from './AssetManager';

const DesignerBar: React.FC = () => {
  const { switchProfile, availableProfiles } = useIndustryProfile();
  const [previewMode, setPreviewMode] = useState(false);
  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [themeColors, setThemeColors] = useState({
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#10B981'
  });

  const handleProfileChange = (type: IndustryType) => {
    switchProfile(type);
  };

  const handleSave = async () => {
    // Save current theme and layout settings
    const settings = {
      theme: themeColors,
      layout: {
        // Add layout settings here
      }
    };
    
    localStorage.setItem('designerSettings', JSON.stringify(settings));
    // Show success message or notification
  };

  const toggleEditor = (editorName: string) => {
    setActiveEditor(activeEditor === editorName ? null : editorName);
  };

  const handleColorChange = (colorType: string, color: string) => {
    setThemeColors(prev => ({
      ...prev,
      [colorType]: color
    }));
    // Apply color changes to the theme
    document.documentElement.style.setProperty(`--color-${colorType}`, color);
  };

  return (
    <>
      <div className="fixed top-[1.75rem] left-0 right-0 bg-gray-800 text-white h-12 flex items-center justify-between px-4 z-40">
        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => handleProfileChange(e.target.value as IndustryType)}
            className="bg-gray-700 text-white border-gray-600 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500"
          >
            {availableProfiles.map(profile => (
              <option key={profile.id} value={profile.type}>
                {profile.name}
              </option>
            ))}
          </select>

          <div className="h-6 border-l border-gray-600" />

          <button 
            onClick={() => toggleEditor('theme')}
            className={`p-2 rounded hover:bg-gray-700 ${activeEditor === 'theme' ? 'bg-gray-600' : ''}`}
            title="Theme Editor"
          >
            <Paintbrush className="h-4 w-4" />
          </button>

          <button 
            onClick={() => toggleEditor('layout')}
            className={`p-2 rounded hover:bg-gray-700 ${activeEditor === 'layout' ? 'bg-gray-600' : ''}`}
            title="Layout Editor"
          >
            <Layout className="h-4 w-4" />
          </button>

          <button 
            onClick={() => toggleEditor('grid')}
            className={`p-2 rounded hover:bg-gray-700 ${activeEditor === 'grid' ? 'bg-gray-600' : ''}`}
            title="Grid Editor"
          >
            <Grid className="h-4 w-4" />
          </button>

          <button 
            onClick={() => toggleEditor('assets')}
            className={`p-2 rounded hover:bg-gray-700 ${activeEditor === 'assets' ? 'bg-gray-600' : ''}`}
            title="Asset Manager"
          >
            <Image className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className={`p-2 rounded ${previewMode ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            title={previewMode ? 'Exit Preview' : 'Preview Mode'}
          >
            <Eye className="h-4 w-4" />
          </button>
          
          <button 
            onClick={handleSave}
            className="p-2 hover:bg-gray-700 rounded"
            title="Save Changes"
          >
            <Save className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Editor Panels */}
      {activeEditor && (
        <div className="fixed top-[7.5rem] right-0 w-80 bg-white shadow-lg rounded-l-lg overflow-hidden z-30">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">
              {activeEditor.charAt(0).toUpperCase() + activeEditor.slice(1)} Editor
            </h3>
            <button 
              onClick={() => setActiveEditor(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4">
            {activeEditor === 'theme' && (
              <ColorPicker 
                colors={themeColors} 
                onChange={handleColorChange} 
              />
            )}
            {activeEditor === 'layout' && (
              <LayoutEditor />
            )}
            {activeEditor === 'grid' && (
              <GridEditor />
            )}
            {activeEditor === 'assets' && (
              <AssetManager />
            )}
          </div>
        </div>
      )}

      {/* Preview Mode Overlay */}
      {previewMode && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-2 px-4 text-center z-50">
          Preview Mode - <button onClick={() => setPreviewMode(false)} className="underline">Exit</button>
        </div>
      )}
    </>
  );
};

export default DesignerBar;