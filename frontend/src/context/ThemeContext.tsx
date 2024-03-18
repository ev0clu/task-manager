import { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

const restoreLocalStorage = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value ? 'dark' : 'light';
  }
  return 'light';
};

const ThemeContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() =>
    restoreLocalStorage()
  );
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {mounted && children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
