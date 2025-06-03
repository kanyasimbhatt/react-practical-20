import { useState } from 'react';
import { createContext, useContext } from 'react';

export type UsersArrayType = {
  userId: string;
  setUserId: (c: string) => void;
};
const UserContext = createContext<UsersArrayType>({
  userId: '',
  setUserId: () => {},
});

type ChildrenType = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<ChildrenType> = ({ children }) => {
  const userData = localStorage.getItem('user-id') || '';
  const [userId, setUserId] = useState<string>(userData);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};