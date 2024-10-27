import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  retry?: () => void;
}

export default function ErrorState({ 
  message = 'Something went wrong', 
  retry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <AlertCircle className="h-8 w-8 text-red-500" />
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}