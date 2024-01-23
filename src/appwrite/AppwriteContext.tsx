import { View, Text } from 'react-native'
import React, { FC, createContext } from 'react'

import Appwrite from './service'
import { PropsWithChildren } from 'react';
import { useState } from 'react';

type AppContextType = {
    appwrite: Appwrite;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    logout: () => Promise<void>; // New logout function
}

export const AppwriteContext = createContext<AppContextType>({
    appwrite: new Appwrite(),
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    logout: async () => {}, // Initial empty logout function

})

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const appwrite = new Appwrite();

  const logout = async () => {
    try {
      await appwrite.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const defaultValue: AppContextType = {
    appwrite,
    isLoggedIn,
    setIsLoggedIn,
    logout,
  };

  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;