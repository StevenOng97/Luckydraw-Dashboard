import { createContext, useContext } from 'react';

export enum Theme {
  Toggled = 'Toggled',
  NotToggled = 'NotToggled',
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Toggled,
  setTheme: (theme) => console.warn('no theme provider'),
});

export const useTheme = () => useContext(ThemeContext);
