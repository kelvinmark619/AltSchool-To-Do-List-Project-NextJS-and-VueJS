import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // remove .jsx extension, TypeScript resolves .tsx automatically

// Use non-null assertion (!) so TS knows root is not null
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
