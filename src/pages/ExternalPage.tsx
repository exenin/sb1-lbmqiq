import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExternalLink, RefreshCw } from 'lucide-react';
import LoadingState from '../components/common/LoadingState';

export default function ExternalPage() {
  const { pageId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get page configuration from settings
  const getPageConfig = () => {
    // This would normally fetch from your settings/config service
    return {
      url: 'https://example.com/embedded-page',
      title: 'External System'
    };
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setError('Failed to load external page');
    setLoading(false);
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    const iframe = document.getElementById('external-page') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const pageConfig = getPageConfig();

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{pageConfig.title}</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Refresh"
          >
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </button>
          <a
            href={pageConfig.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Open in new tab"
          >
            <ExternalLink className="h-5 w-5 text-gray-600" />
          </a>
        </div>
      </div>

      <div className="relative bg-white rounded-lg shadow h-[calc(100vh-12rem)]">
        {loading && (
          <div className="absolute inset-0 bg-white z-10">
            <LoadingState message="Loading external page..." />
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 mb-2">{error}</p>
              <button
                onClick={handleRefresh}
                className="text-blue-500 hover:text-blue-600"
              >
                Try again
              </button>
            </div>
          </div>
        ) : (
          <iframe
            id="external-page"
            src={pageConfig.url}
            className="w-full h-full rounded-lg"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </div>
    </div>
  );
}