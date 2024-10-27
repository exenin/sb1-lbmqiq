import React from 'react';
import { PageComponent } from '../../types/models';
import GridLayout from '../content/GridLayout';
import ImageGallery from '../content/ImageGallery';
import RichText from '../content/RichText';
import ShopItems from '../content/ShopItems';
import VideoPlayer from '../content/VideoPlayer';
import ProfileCard from '../content/ProfileCard';
import Schedule from '../content/Schedule';

interface ComponentRendererProps {
  component: PageComponent;
  isPreview: boolean;
  onUpdate: (updates: Partial<PageComponent>) => void;
}

export default function ComponentRenderer({ 
  component, 
  isPreview,
  onUpdate 
}: ComponentRendererProps) {
  const renderComponent = () => {
    switch (component.type) {
      case 'grid':
        return <GridLayout data={component.data} />;
      case 'image':
        return <ImageGallery data={component.data} />;
      case 'text':
        return <RichText data={component.data} />;
      case 'shop':
        return <ShopItems data={component.data} />;
      case 'video':
        return <VideoPlayer data={component.data} />;
      case 'profile':
        return <ProfileCard data={component.data} />;
      case 'schedule':
        return <Schedule data={component.data} />;
      default:
        return <div>Unknown component type</div>;
    }
  };

  if (isPreview) {
    return renderComponent();
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg opacity-0 group-hover:opacity-100" />
      <div className="p-4">
        {renderComponent()}
      </div>
    </div>
  );
}