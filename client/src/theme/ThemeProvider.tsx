// src/theme/ThemeProvider.tsx
import React, { ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import theme from './theme';

interface ThemeProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProps> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default ThemeProvider;
