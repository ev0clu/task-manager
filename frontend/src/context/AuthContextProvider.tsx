import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

type AuthConextType = {
  token: string | null;
  setToken: (newValue: string) => void;
  clearToken: () => void;
};

const AuthContext = createContext<AuthConextType>({
  token: '',
  setToken: () => {},
  clearToken: () => {}
});

const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'));

  const [mounted, setMounted] = useState(false);

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  // Function to clear the authentication token
  const clearToken = () => {
    setToken('');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      clearToken
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>
      {mounted && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuth };
