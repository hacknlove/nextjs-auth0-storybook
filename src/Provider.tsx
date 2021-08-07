import React, { ReactElement, useState, useEffect, createContext, useContext } from 'react';
import { UserContext, UserProviderProps, UserProfile } from '@auth0/nextjs-auth0';

type UserProviderState = {
  user?: UserProfile;
  error?: Error;
  isLoading: boolean;
};

const initialDefaultUser: UserProviderState = {
  isLoading: false
}

const checkSession = async () => {};

export default ({
  user: initialUser,
  children,
}: UserProviderProps): ReactElement<UserContext> => {
  const { user, error, isLoading } = initialUser as UserProviderState

  return (
    <UserContext.Provider value={{ user, error, isLoading, checkSession }}>{children}</UserContext.Provider>
  );
};