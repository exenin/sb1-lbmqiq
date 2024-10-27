import React, { useState } from 'react';
import { Upload, Folder, Image, File, Trash2 } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'file';
  url: string;
  size: number;
}

export default function AssetManager() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'hero-image.jpg',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=200',
      size: 524288
    },
    {
      id: '2',
      name: 'document.pdf',
      type: 'file',
      url: '#',
      size: 102400
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Handle file upload
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAsset: Asset = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: e.target?.result as string,
          size: file.size
        };
        setAssets(prev => [...prev, newAsset]);
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">Upload files</span>
          <span className="text-xs text-gray-500">or drag and drop</span>
        </label>
      </div>

      <div className="space-y-2">
        {assets.map(asset => (
          <div
            key={asset.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {asset.type === 'image' ? (
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <File className="h-10 w-10 text-gray-400" />
              )}
              <div>
                <p className="text-sm font-medium">{asset.name}</p>
                <p className="text-xs text-gray-500">{formatSize(asset.size)}</p>
              </div>
            </div>
            <button
              onClick={() => deleteAsset(asset.id)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {assets.length > 0 && (
        <div className="border-t pt-4">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Apply Changes
          </button>
        </div>
      )}
    </div>
  );
}