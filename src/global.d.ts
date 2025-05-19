export {};

declare global {
  interface Window {
    env: {
      REACT_APP_API_URL?: string;
      REACT_APP_AZURE_STORAGE_URL: string;
      REACT_APP_STORAGE_EMPLOYEES: string;
      NODE_ENV: string;
    };
  }
} 