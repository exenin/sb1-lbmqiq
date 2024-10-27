export const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
export const isDebugMode = import.meta.env.VITE_DEBUG_MODE === 'true';

export const getEnvConfig = () => ({
  isDemoMode,
  isDebugMode,
  apiUrl: isDemoMode ? '/api' : 'https://api.production.com',
  wsUrl: isDemoMode ? 'ws://localhost:8080' : 'wss://api.production.com'
});