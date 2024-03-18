import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={toggleTheme}>Test</button>
      <div>ASD</div>
    </div>
  );
}

export default App;
