import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Users } from 'lucide-react';

interface Participant {
  id: string;
  stream?: MediaStream;
  name: string;
}

export default function VideoConference() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [janusSession, setJanusSession] = useState<any>(null);

  useEffect(() => {
    // Initialize local media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // Initialize Janus connection here
        initializeJanus();
      })
      .catch(err => console.error('Error accessing media devices:', err));

    return () => {
      // Cleanup Janus connection
      if (janusSession) {
        janusSession.destroy();
      }
    };
  }, []);

  const initializeJanus = () => {
    // Initialize Janus
    // This is where you'd connect to your Janus server
    // and set up the WebRTC connection
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // Implement audio toggle logic
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // Implement video toggle logic
  };

  const endCall = () => {
    // Implement call end logic
  };

  return (
    <div className="h-[calc(100vh-12rem)] bg-gray-900 rounded-lg overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {/* Local Video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              You
            </div>
          </div>

          {/* Participant Videos */}
          {participants.map(participant => (
            <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
              <video
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {participant.name}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full ${
                isAudioEnabled ? 'bg-gray-600' : 'bg-red-500'
              }`}
            >
              {isAudioEnabled ? (
                <Mic className="h-6 w-6 text-white" />
              ) : (
                <MicOff className="h-6 w-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full ${
                isVideoEnabled ? 'bg-gray-600' : 'bg-red-500'
              }`}
            >
              {isVideoEnabled ? (
                <VideoIcon className="h-6 w-6 text-white" />
              ) : (
                <VideoOff className="h-6 w-6 text-white" />
              )}
            </button>

            <button
              onClick={endCall}
              className="p-4 rounded-full bg-red-500"
            >
              <PhoneOff className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}