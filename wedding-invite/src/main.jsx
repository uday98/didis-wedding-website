import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './theme/ThemeProvider';
import { LookProvider } from './theme/LookProvider';
import { applyMotionVars } from './theme/motion';
import App from './App';
import './theme/tokens.css';
import './styles/base.css';
import './styles/look.css';
import './styles/interaction.css';
import './styles/print.css';

applyMotionVars();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LookProvider>
        <App />
      </LookProvider>
    </ThemeProvider>
  </StrictMode>,
);
